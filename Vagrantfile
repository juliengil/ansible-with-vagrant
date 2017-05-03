VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "ubuntu/trusty64"
  config.vm.define "my_machine"

  config.vm.network "public_network"
  config.vm.network "forwarded_port", guest: 8080, host: 8081
  config.vm.network "forwarded_port", guest: 443, host: 4443

  config.ssh.username = "vagrant"
  config.ssh.password = "vagrant"

  config.vm.provider "virtualbox"

  config.vm.provision "ansible" do |ansible|
    ansible.playbook = "./Ansible/playbook.yml"
    ansible.groups = {
      "group1" => ["my_machine"]
    }
  end

end