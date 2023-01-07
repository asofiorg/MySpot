```bash
sudo su

curl -fsSL https://deb.nodesource.com/setup_18.x | bash -

apt-get install -y nodejs git

npm install -g yarn

git clone https://github.com/asofiorg/myspot.git

cd myspot/client

cp .env.example .env

yarn

yarn build

yarn start
```