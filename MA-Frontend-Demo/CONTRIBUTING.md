# Frontend Demo

Mockup a simple API exposing realtor information and messages.

## Start with Docker

```bash
docker-compose up
```

## Start manually

Install pip (package manager for python) if necessary.

```bash
sudo easy_install pip
```

Install virtualenv (isolate app with its depedencies)

```bash
pip install virtualenv
```

## Install and run

Initialize the virtualenv and install dependencies:

```bash
make init
```

Run the application:

```bash
make run
PORT=5001 make run # (default port: 8080)
```
