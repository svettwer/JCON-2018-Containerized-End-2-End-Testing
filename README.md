# Containerized End-2-End-Testing
This repository contains all sources of my Talk *Containerized End-2-End-Testing*

## Repository structure

* paas  
  This directory contains everything required to setup the paas infrastructure.
* infra  
  Contains the infrastructure configuration to build the sample app.
* src  
  Contains the source code of the sample app
  
## Setup
A minishift setup is required on your local machine.
The project setup is mostly automated via the bootsrap.sh script in the *paas* folder.
Please have a look at the script for the manual import of the todo-app repository
into the local gogs setup. After cloning/forking the repository and setting up the paas, 
it may be required to change the repository references in the *infra* configuration files
depending on the user name you've chosen for your gogs installation.
In addition, it may be required to change the ip addresses in the configuration files
depending the ip address that has been assigned to your cluster. I recommend a search and
replace for `192.168.99.109` to the ip delivered by the command `minishift ip`

### Enterprise features
This sample project uses Sakuli enterprise features such as monitoring forwarder, Docker images and S2I builds.
To setup this project, a valid Sakuli license have to be placed in a secret named `sakuli-license` within the 
`todo-app-int` namespace. In addition, access to the sakuli Docker-Hub namespace is required to use S2I builds.
To obtain a 14 days trial license and trial access to the Docker-Hub namespace, please visit [sakuli.io](https://sakuli.io/enterprise/). 