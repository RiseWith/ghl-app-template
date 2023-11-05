# `@cbnsndwch/ghl-app`

A base template for full-stack HighLevel Marketplace apps

## Table of Contents

- [Getting Started](#getting-started)
- [Usage](#usage)
- [API Routes](#api-routes)
- [SSO Integration](#sso-iframe-integration)
- [License](#license)

## Getting Started

> &nbsp;
> :warning: This project requires a recent version of NodeJS installed on your machine. The
> curret LTS version is NodeJS 20.x but you should be OK using NodeJS 18.x through
> until the end of the maintenance period in April 2025.
>
> For more information on NodeJS LTS releases, see the [NodeJS Release Schedule].
> &nbsp;

Create a new repository from this template

<a class="btn btn-primary" href="https://github.com/new?template_name=ghl-app&template_owner=cbnsndwch" style="margin-bottom: 1rem;">
    Use this template
</a>

Clone your new repository and install the dependencies:

```shell
git clone https://github.com/{YOUR_GITHUB_USERNAME}/ghl-app
cd ghl-app
yarn
```

Open the directory in VSCode:

```shell
code .
```

To start the development server with the debugger attached run the `Debug API` launch configuration. Alternatively, change to the `apps/server` directory and run the following command:

```shell
yarn dev
```

## Usage

Work in progress...

## API Routes

Work in progress...

## SSO (iframe integration)

> &nbsp;
> :warning: If you cannot see the diagram below, please install the [Markdown Preview Enhanced](https://marketplace.visualstudio.com/items?itemName=shd101wyy.markdown-preview-enhanced) VSCode extension.
> &nbsp;

This section illustrates the process of authenticating a user in the context of a GHL Marketplace App's Custom Pages, by using the new GHL SSO feature. The SSO flow works as follows:

1. The user navigates to the GHL App under the Marketplace menu.
2. The GHL App loads the Custom Page in an iframe.
3. The Custom Page requests the SSO session info from the GHL App by sending a cross-frame message.
4. The GHL App requests the SSO session info from the GHL Server, passing the app's Client ID.
5. The GHL Server uses the app's SSO Token to encrypt the SSO session info and returns it to the GHL App.
6. The GHL App returns the encrypted SSO session info to the Custom Page by sending a response cross-frame message.
7. The Custom Page sends the encrypted SSO session info to the Marketplace App's back-end. The back-end decrypts the SSO session info using the app's SSO Token. Perform app-specific autjorization logic here, like checking if the user, location, or agency is allowed to access the Marketplace.
8. The back-end returns the decrypted SSO session info to the Custom Page along with any relevant app-specific data.
9. The Custom Page now has access to the user's SSO session info and can use it to show content or provide functionality that is user-, location-, or agency-specific.

```plantuml
@startuml GHL App SSO Integration
skinparam lifelineStrategy nosolid

actor User as user
participant "GHL" as ghl
participant "GHL Server" as server
participant "GHL App Custom Page" as web
participant "GHL App Back-End" as api

user -> ghl : navigates to GHL App under Marketplace
ghl -> web : loads App Custom Page in iframe
web -> ghl : requests SSO session info
ghl -> server : requests SSO session info for App
server -> ghl : returns ecrypted SSO session info
ghl -> web : returns ecrypted SSO session info
web -> api : sends session info
api -> api : decrypts session info with SSO Token
api -> web : returns decrypted SSO session info
web -> user : shows user/location/agency-specific content

@enduml
```

For a reference implementation see the code in `apps/server/public/js/ghl.mjs`.

## License

This project is licensed under the [MIT License](LICENSE.md).

[NodeJS Release Schedule]: https://nodejs.org/en/about/previous-releases
