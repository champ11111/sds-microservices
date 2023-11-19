## Simple Service

```mermaid
flowchart LR
    client <---> ingress["ingress (traefik)"]
	subgraph k3s-cluster
		direction LR
		ingress <---> nginx
		nginx  <---> service-1
		nginx  <---> service-2
		nginx  <---> service-3
		nginx  <---> service-4
		nginx  <---> service-1
		nginx  <---> service-2
		nginx  <---> service-3
		nginx  <---> service-4
	end
	subgraph nginx
        direction LR
        nginx-1["pod-1"]
		nginx-2["pod-2"]
    end
	subgraph service-1
        direction LR
        service-1-1["pod-1"]
		service-1-2["pod-2"]
    end
	subgraph service-2
        direction LR
        service-2-1["pod-1"]
		service-2-2["pod-2"]
    end
	subgraph service-3
         direction LR
        service-3-1["pod-1"]
		service-3-2["pod-2"]
    end
	subgraph service-4
        direction LR
        service-4-1["pod-1"]
		service-4-2["pod-2"]
    end

```

```bash
 # step 0: add helm repo
 helm repo add bitnami https://charts.bitnami.com/bitnami
 helm repo add traefik https://traefik.github.io/charts

 # step 1: install ingress
 helm upgrade traefik --install  traefik/traefik

 # step 2: deploy
 testup:
	kubectl apply -f ./kube
```
