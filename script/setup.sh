#!/bin/sh

cd $(dirname $0)

cp -f git/hooks/pre-commit ../.git/hooks
