#!/bin/bash

oc run check-layout \
    --image=172.30.1.1:5000/todo-app-int/check-layout:latest \
    --attach=true \
    --rm \
    --restart=Never \
    -l application=check-layout \
    -n todo-app-int


oc run check-life-cycle \
    --image=172.30.1.1:5000/todo-app-int/check-life-cycle:latest \
    --attach=true \
    --rm \
    --restart=Never \
    -l application=check-life-cycle \
    -n todo-app-int