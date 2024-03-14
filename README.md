# Events Discover

## Running

Create the environment files at `/src` folder as following:

```
.
  /src
    /environments
      environment.development.ts
      environment.ts
```

Both files should contain the following content:

```javascript
export const environment = {
  ticketMasterAPIKey: 'YOUR_TICKET_MASTER_CONSUMER_KEY',
};
```

Make sure you have Angular CLI installed on your computer and run the following command on a terminal of your preference:

```
ng serve
```
