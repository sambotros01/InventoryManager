# Welcome to Supra Tracker!
This is an application designed to track the food inventory at the Space Force DFACs (if those even exist).
The application is in operational condition to meet all user story requests.
Have fun!

# User Requirements
- As an inventory manager I want to be able to create an account so that I can track my inventory.

- As an inventory manager I want to be able to log into my account so that I can see my inventory of items.
    - After logging in, the inventory manager should be redirected to their inventory of items.

- As an inventory manager I want to be able to create a new item so that I can share my item details with the world.
    - After the item is created, the inventory manager should be redirected to their inventory of items.
    - An item displays name, description, and quantity.

- As an inventory manager I want to be able to see a my entire inventory of items.
    - The inventory of items should display the first 100 characters of each item description, with “...” at the end if the description is longer than 100 characters.

- As an inventory manager I want to be able to see any individual item I have added.
   - The full item information should be displayed.

- As an inventory manager I want to be able to edit an item so that I can fix any mistakes I made creating it.
    - When the user toggles edit mode, the page remains the same and the fields become editable.

- As an inventory manager I want to be able to delete an item so that I can remove any unwanted content.
    - When the user deletes the item they should be redirected to their inventory of items.

- As a visitor, who is not logged in, I want to be able to view all items created by every inventory manager so that I can browse every item
    - Unauthenticated users should be able to view all items, and any single item.
    - The items should only display the first 100 characters of its description with “...” at the end if it is longer than 100 characters.

- As a visitor, who is not logged in, I want to be able to view a specific item created by any user so that I can see all of its details.
    - Unauthenticated users should be able to view all items, and any single item.

- As an inventory manager I want to be able to view all items created by every inventory manager so that I can browse every item.
    - Unauthenticated users should be able to view all items, and any single item.


# Getting Started

  ## Project Setup
    - By the end of the set up you should have the following folders:
        - /api
        - /ui

  ## React App: UI
    - Build React App
      - cd into ui
      - npm install
      - npm start
      - React Page should now be up and running on local host

  ## Run API
    - cd into api
    - npm start
    - Server should now be up and running on a local port

  ## Create Data
    - Image
      - docker pull postgres

    - Volume
      - mkdir -p $HOME/docker/volumes/postgres

    - Container
      - docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 \
        -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres

    - View Images
      - docker ps -a

    - Run image shell
      - docker exec -it <PSQL-Container-ID> bash

    - Log In
      - psql -U postgres

    - Migration
      - Migrate tables are provided in the folder <migrations> within api
      - npx knex migrate:lastest

    - Seed Data
      - Seed data is provided in the folder <seeds> within api
      - npx knex seed:run


