.PHONY: fetch update apply run delete
fetch:
	helm repo add bitnami https://charts.bitnami.com/bitnami
	helm repo add traefik https://traefik.github.io/charts
update:
	helm dependency update charts/cinema
apply:
	helm upgrade cinema --install  ./charts/cinema
list:
	kubectl get po -o wide
run:
	kubectl port-forward svc/cinema-website 8000:80
show:
	kubectl describe ingress/cinema-website
delete:
	helm delete cinema
ingress:
	helm upgrade traefik --install  traefik/traefik  
testup:
	kubectl apply -f ./spare
testdown:
	kubectl delete -f  ./spare
username=bluetogepi
tag=v2.2.1
build:
	docker build -t $(username)/cinema-users:$(tag) ./users
	docker build -t $(username)/cinema-movies:$(tag) ./movies
	docker build -t $(username)/cinema-showtimes:$(tag) ./showtimes
	docker build -t $(username)/cinema-website:$(tag) ./website
	docker build -t $(username)/cinema-bookings:$(tag) ./bookings
push:
	docker push $(username)/cinema-users:$(tag) 
	docker push $(username)/cinema-movies:$(tag)
	docker push $(username)/cinema-showtimes:$(tag)
	docker push $(username)/cinema-website:$(tag)
	docker push $(username)/cinema-bookings:$(tag) 

username-simple=champkub6
tag=v3.0.0
build-simple:
	docker buildx build --platform linux/amd64,linux/arm64 -t $(username-simple)/service1:$(tag) ./services/service1
	docker buildx build --platform linux/amd64,linux/arm64 -t $(username-simple)/service2:$(tag) ./services/service2
	docker buildx build --platform linux/amd64,linux/arm64 -t $(username-simple)/service3:$(tag) ./services/service3
	docker buildx build --platform linux/amd64,linux/arm64 -t $(username-simple)/service4:$(tag) ./services/service4
push-simple:
	docker push $(username-simple)/service1:$(tag)
	docker push $(username-simple)/service2:$(tag)
	docker push $(username-simple)/service3:$(tag)
	docker push $(username-simple)/service4:$(tag)

