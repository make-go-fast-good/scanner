#!/bin/bash
tmux new-session -d -s telegram_sesh
    tmux new-window -d -n frontEnd 'cd ../../Projects/Telegrams/ && npm start'
    # -d to prevent current window from changing
    tmux new-window -d -n backEnd 'cd ../../Projects/Telegrams/serve && node server.js'
