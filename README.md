# A Vuejs (MEVN) fork of the [KTM](https://github.com/chejen/keys-translations-manager)

#### Why Vuejs?
Why not! I'm a big fan of the framework and found its really easy to intergrate complex ideas in simple manner.  

I also needed a key translations manager and I stumbled upon KTM, which featured a nice [MERN](http://mern.io/) stack. It contained most of the features I had been looking for

## Getting started

The front and the server are ran separately (temporarily)
#### Install
`yarn install` installs all the needed packages.
#### Development:  
- Server: `yarn dev`
- Front: `yarn serve`  

#### Production:
- Server: `yarn start`
- Front: `yarn build`  


## Custom
There are several environment variables you can configure:

| **Variable** | **Description** |**Default**|
|----------|-------|---|
|  PORT  |   Web server's port    | ```3000```  |
|  DB  |   MongoDB connection URI    | ```mongodb://localhost:27017/translationdb```  |

There are some other settings (in [ktm.config.js](./ktm.config.js)) you can configure. The table below lists the available ones:

| **Setting** | **Description** |**Default**|
|----------|-------|---|
|  locales  |   The locales need to be managed. (You can add or remove locales arbitrarily.)    | ```['en-US', 'zh-TW']```  |
|  projects  |   The projects need to be localized. (You can add or remove projects arbitrarily.)    | ```[{id: 'p1',      name: 'Project A', base: 'en' }, { id: 'p2', name: 'Project B', base: 'en' } ]```  |
|  enableNotifications  |   Push real-time notifications to users    | ```true```  |  

### @Todos  
###### Translations
- [ ] Load translations
- [ ] Editable translations
- [ ] Save edited translations
- [ ] Merge translations
- [ ] Add translation(s)  
- [ ] add .PO conversion / download

###### Projects
- [ ] Project Manager
  - [ ] Add projects
  - [ ] Edit Projects
  - [ ] Add/edit locales

###### Other
- [ ] Use Server.js to render frontend UI
- [ ] Add testing

## License
This source code is licensed under the [MIT License](http://www.opensource.org/licenses/MIT).
