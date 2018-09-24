#!/bin/bash

oc run checkLayout \
    --image=172.30.1.1:5000/todo-app-int/checkLayout:latest \
    --attach=true \
    --rm \
    --restart=Never \
    -l application=checkLayout


oc run checkLifeCycle \
    --image=172.30.1.1:5000/todo-app-int/checkLifeCycle:latest \
    --attach=true \
    --rm \
    --restart=Never \
    -l application=checkLifeCycle
