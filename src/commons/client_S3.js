import { S3Client } from "@aws-sdk/client-s3";
import LOG from "./logger";
import { YOUR_AWS_REGION } from "./constants";

class S3ClientSingleton {
  constructor() {
    if (!S3ClientSingleton.instance) {
      this.s3 = null; // Inicializar la propiedad s3 
      S3ClientSingleton.instance = this;
      this.initializeClient();
    }
    return S3ClientSingleton.instance;
  }

  async initializeClient() {
    try {
      this.s3 = new S3Client({region: YOUR_AWS_REGION});
      LOG.info('S3 Client initialized successfully')
      // Congelar la instancia después de inicializar el cliente S3 
      Object.freeze(S3ClientSingleton.instance);
    } catch (error) {
      LOG.error('Error initializing S3 Client')
      LOG.error(error)
    }
  }

  getClient() {
    if (!this.s3) {
      LOG.error('S3 Client is not initialized')
    }
    return this.s3;
  }
}

const instance = new S3ClientSingleton();

export default instance;
