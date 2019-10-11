#!/bin/bash

function help() {
    echo "Usage: sh bootstrap.sh <DOCKER_USERNAME> <DOCKER_PASSWORD>"
    echo ""
    echo "Parameters:"
    echo "  DOCKER_USERNAME: Dockerhub user with access to taconsol"
    echo "  DOCKER_PASSWORD: Password of the dockerhub user"
    echo "  SAKULI_LICENSE: Sakuli license file"
}

DOCKER_USERNAME="${1}"
DOCKER_PASSWORD="${2}"
SAKULI_LICENSE="${3}"

[[ -z "${DOCKER_USERNAME}" ]] && echo "ERROR: DOCKER_USERNAME is empty" && help  && exit
[[ -z "${DOCKER_PASSWORD}" ]] && echo "ERROR: DOCKER_PASSWORD is empty" && help && exit
[[ -z "${SAKULI_LICENSE}" ]] && echo "ERROR: SAKULI_LICENSE is empty" && help && exit

oc login -u developer -p whateverYourPasswordWouldBe

oc delete project myproject

oc new-project todo-app-dev
oc new-project todo-app-int
oc new-project todo-app-prod

oc project todo-app-dev
oc process -f $(git rev-parse --show-toplevel)/infra/yml/jenkins_template.yml | oc apply -f -

oc project todo-app-int
oc create secret docker-registry dockerhub-sakuli-secret \
    --docker-server=docker.io \
    --docker-username=${DOCKER_USERNAME} \
    --docker-password=${DOCKER_PASSWORD} \
    --docker-email=unused
oc secrets link builder dockerhub-sakuli-secret
oc import-image sakuli-s2i \
    --from=docker.io/taconsol/sakuli-s2i \
    --confirm \
    --scheduled=true \
    --all=true
oc create secret generic sakuli-license \
    --from-literal=license=${SAKULI_LICENSE}

oc policy add-role-to-user edit system:serviceaccount:todo-app-dev:jenkins -n todo-app-int
oc policy add-role-to-user edit system:serviceaccount:todo-app-dev:jenkins -n todo-app-prod