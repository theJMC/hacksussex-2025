#!/bin/bash

PORT=52001


if [ $1 = "start" ]; then
    echo "Starting Tailscale Funnel"
    sudo tailscale funnel --bg $PORT
elif [ $1 = "stop" ]; then
    echo "Stopping Tailscale Funnel"
    sudo tailscale funnel --https=443 off
else
    echo "Invalid command"
fi
