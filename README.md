# ansible-with-vagrant
```bash
git clone git@github.com:juliengil/ansible-with-vagrant.git vagrant_ansible
cd vagrant_ansible
vagrant up
```

result on 0.0.0.0:8081 => it is possible to change the port :
```bash
vim vagrant_ansible/Vagrantfile
```
```ruby
# ...
config.vm.network "public_network"
config.vm.network "forwarded_port", guest: 8080, host: 8081   #change 8081 to the wanted port
config.vm.network "forwarded_port", guest: 443, host: 4443
# ...
```
