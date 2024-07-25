# How deployment process configured
This document is intended to clarify gaps in the deployment process of Pastauctions.

### Image
Here, can be found information only about deployment of `pastauction/frontend` image.
For information about another images, please refer to readme file in corresponding repo.

### Environment variables
During build of the docker image, production specific environment variables will be used from `.env.prod` file.

### Process
Build process is configured into two stages.
During first one, the application assets will be transpiled.
During second one, assets from first stage will be copied into docker image with `nginx` to be hosted as a static site.
