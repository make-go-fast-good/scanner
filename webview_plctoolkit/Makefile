currentDir = $(shell pwd)

## installation
install:
	@echo "==> installing dependencies"
	@npm install
.PHONY: install

build:
	@echo "==> building plc toolkit for windows"
	@go build -o plctoolkit.exe
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
