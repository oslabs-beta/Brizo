# creating your cluster
- install eksctl and amazon cli
- eksctl create cluster --node-type=m6g.medium
  - this makes sure we use arm64 instance to match our cpu architecture 
# Steps for running kube bench on an EKS cluster
- aws ecr create-repository --repository-name k8s/kube-bench --image-tag-mutability MUTABLE
- git clone https://github.com/aquasecurity/kube-bench.git
- cd kube-bench
- aws ecr get-login-password --region us-east-2 | docker login --username AWS --password-stdin 979439831614.dkr.ecr.us-east-2.amazonaws.com
- docker build -t kube-bench kube-bench
- docker tag kube-bench:latest 979439831614.dkr.ecr.us-east-2.amazonaws.com/k8s/kube-bench:latest
- docker push 979439831614.dkr.ecr.us-east-2.amazonaws.com/k8s/kube-bench:latest
- eksctl create iamidentitymapping --cluster beautiful-mushroom-1687649744 --region=us-east-2 --arn     arn:aws:iam::979439831614:user/cortland --group system:masters --username admin
