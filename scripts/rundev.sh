#!/bin/bash

SESSION="plctoolkit"
SESSIONEXISTS=$(tmux list-sessions | grep $SESSION)

if [ "$SESSIONEXISTS" = "" ]
then
    tmux new-session -d -s $SESSION

    # Name first Pane and start zsh
    tmux rename-window -t 1 'Main'
    tmux new-window -d -n frontEnd 'npm start'
    tmux new-window -d -n backEnd 'cd serve/ && node server.js'
fi
tmux attach-session -t $SESSION:1
