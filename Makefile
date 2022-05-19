install-ui:
	cd smart-hardware-ui && rm -rf node_modules && yarn install

install-server:
	cd backend && rm -rf node_modules && yarn install

install-web-dev-deps:
	make -j 2 install-ui install-server

npm-server: ## Run npm server to live reload
	cd smart-hardware-ui && yarn run start

json-server: ## Run npm server to live reload
	cd backend && yarn run start

start-web-dev:
	make -j 2 npm-server json-server