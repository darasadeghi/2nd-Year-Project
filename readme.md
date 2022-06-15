dependencies:
- need docker installed, i'm using "Docker version 20.10.5"
- need bash to run the setup program (written in bash)

to run:
- cd into 'this' (directory of this readme) directory
- type and enter the following shell command into your terminal: "bash se-docker-setup.sh"
- should take 2-3 minutes first time, then it'll reference caches and take 1-2 minutes
- when re-running the script, make sure that:
    - no process running on port 3306
    - no process running on port 5000
    - no process running on port 8080
    - NOTE: process includes docker containers running (they're processes)

todo list:
- [ ] demo and send to team
- [ ] you're hardcoding a lot of stuff, for example: changing the mysql container ip address will result in you having to change 2 files (one within your java backend's applicationsettings class, and the other within your bash setup script) - improve this by having a single source of truth, that is referred to by the setup script to then populate any source files as needed
- [ ] improve sentences for translations - they're buggy rn - i don't think this is a big job
- [ ] add in button to get a spanish translation problem
- [ ] add in websockets stuff