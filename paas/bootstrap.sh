#!/bin/bash

MINISHIFT_VM_DRIVER=virtualbox
MINISHIFT_MEMORY=8GB
MINISHIFT_DISK_SIZE=40GB
MINISHIFT_CPU_COUNT=3

OPENSHIFT_VERSION=3.10.0


minishift profiles set jcon-containerized-end-2-end-testing
minishift start \
        --vm-driver=${MINISHIFT_VM_DRIVER} \
        --memory=${MINISHIFT_MEMORY} \
        --openshift-version ${OPENSHIFT_VERSION} \
        --disk-size=${MINISHIFT_DISK_SIZE} \
        --cpus=${MINISHIFT_CPU_COUNT}

oc login -u system:admin

#Setup gogs repository
oc new-project gogs
oc new-app -f http://bit.ly/openshift-gogs-template --param=HOSTNAME=gogs.$(minishift ip).nip.io
#First registered user is admin
#Manual import of the project into gogs required https://github.com/svettwer/JCON-2018-Containerized-End-2-End-Testing.git as 'todo-app'

#Setup offline s2i build
oc project openshift
oc process -f $(git rev-parse --show-toplevel)/paas/yml/s2i_spring_offline_build_template.yml | oc apply -f -
oc start-build -w spring-offline-s2i