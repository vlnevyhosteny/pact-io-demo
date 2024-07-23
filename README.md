# pact-io-demo

Simple demo for Pact.io contract testing. 

## Usage

### 1. Spin up the Pact Broker

```bash
docker-compose up -d
```

Pact Broker will be available at [http://localhost:9292](http://localhost:9292).

### 2. Install dependencies

```bash
yarn
```

### 3. Run the consumer tests

```bash
yarn test:consumer
```

### 4. Publish the contract

```bash
yarn publish:pact
```

### 5. Run the provider verification

```bash
yarn test:provider
```
