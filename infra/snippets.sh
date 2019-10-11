#!/bin/bash

oc run check-layout \
    --image=172.30.1.1:5000/todo-app-int/check-layout:latest \
    --attach=true \
    --rm \
    --restart=Never \
    -l application=check-layout \
    -n todo-app-int

#http://check-layout.192.168.99.110.nip.io/?password=vncpassword


oc run check-life-cycle \
    --image=172.30.1.1:5000/todo-app-int/check-life-cycle:latest \
    --attach=true \
    --rm \
    --restart=Never \
    -l application=check-life-cycle \
    -n todo-app-int

#http://check-life-cycle.192.168.99.110.nip.io/?password=vncpassword