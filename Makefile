currentDir = $(shell pwd)

## installation
install:
	@echo "==> installing dependencies"
	@npm install
.PHONY: install

run:
	@echo "==> starting dev server"
	@${currentDir}/scripts/rundev.sh
.PHONY: run

build:
	@echo "==> building plc toolkit for windows"
	@${currentDir}/scripts/buildWindows.sh
.PHONY: build

git:
	@echo "==> adding git tracked files"
	@git add -u
	@git commit
	@echo "==> pushing to git remote"
	@git push
.PHONY: git

clean:
	@git clean -f
.PHONY: clean
