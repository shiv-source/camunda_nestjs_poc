# Node.js Camunda POC with NestJS

This project is a proof of concept (POC) demonstrating the integration of NestJS with Camunda 7.2. The POC includes creating a NestJS project, designing and deploying a BPMN model in Camunda, and using a cron job to fetch workflow instance data.

## Features

1. **NestJS Application**
   - A NestJS-based project serving as the foundation for Camunda integration.

2. **BPMN Model**
   - A Business Process Model and Notation (BPMN) diagram created using Camunda Modeler.
   - The BPMN file is deployed to a Camunda 7.2 instance.

3. **Cron Job Integration**
   - A scheduled job implemented using the `@nestjs/schedule` package to fetch workflow instance data from Camunda.

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- Camunda 7.2 installed and running locally or on a server
- Camunda Modeler for BPMN creation

## License

This project is licensed under the MIT License.