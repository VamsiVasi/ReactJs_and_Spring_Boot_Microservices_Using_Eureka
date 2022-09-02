# _Full Stack ( ReactJs + Spring Boot )_

**_Stark Employee System using React Js and Spring Boot Microservices_**

# _Software Requirements_
* Application Type : [Microservices](https://spring.io/microservices)
* Build Tool : [Maven](https://spring.io/guides/gs/maven/)
* Database : [MYSQL](https://dev.mysql.com/downloads/mysql/)
* IDE : [Eclipse](https://www.eclipse.org/downloads/), [Visual Studio Code](https://code.visualstudio.com/download)

# _Backend Using Spring Boot_

Step 1 : Create two Spring Boot Microservices i.e **_Employee Service_** and **_Training Service_**

Step 2 : Create another Spring Boot Application to use it as the **_Eureka Server_**

Step 3 : Add **_Eureka Server_** dependency in pom.xml of the two microservices.
( i.e; This is used to register the microservices in Eureka Server )

Step 4 : Start the Consul Server using 
```bash 
consul agent -server -bootstrap-expect=1 -data-dir=C:/Consul/Consul-Data -ui -bind=
```
( Note : After **_bind=_** provide **_ip-address_** and we can get this by using **_ipconfig_** command )

Step 5 : Centralize the common properties of both the services in Consul. ( Requires **_Consul Configuration_** and **_Spring Cloud Starter Bootstrap_** dependencies )
* Open the Consul UI in the browser.
* Select **_Key/Values_** and Click on Create.
* Enter the **_Key or folder_** with **_prefix as config_**, **_defaultContext as application_** for common properties of all services and if is for a particular service mention the _**defaultContext as the 'service name'**_, **_data-key as data_**. ( i.e; Key or folder = config/application/data )
* In the **_Value_** enter the properties which we want to centralize in **_YAML_** format and click on Save.
* Now we can remove all the properties from the services which are mentioned in the consul.
* Create **_bootstrap.yml_** file for the two services and add consul properties to fetch the centralized properties from the consul.

Step 6 : Run the **_Eureka Server Application_**.

Step 7 : Run the **_Employee Service_** and **_Training Service_**.

Step 8 : Check the Eureka UI whether the services are registered or not

Step 9 : Use the Rest Template in Employee Service to communicate with Training Service.
( In RestTemplate, we can use the name of the service specified in **_spring.application.name_** for the URL attribute instead of hardcoding the Ip and Port of the Training Service )

# _Frontend Using ReactJs_

* Note : Install **_React Code Snippets_** Extention in Visual Studio Code for creating component structure easily using **_rcfc_**

Step 1 : Create a react app using **_npx create-react-app stark_employee_system_**

Step 2 : Run all these commands in your project to make use of **_routing_**, **_bootstrap predefined classes_** and **_rest api's_**
```bash 
npm install react-router-dom@5.2.0
```
```bash 
npm i bootstrap@4.6.0
```
```bash 
npm install axios --save
```

Step 3 : import below package in **_index.js_**
```bash 
import 'bootstrap/dist/css/bootstrap.min.css';
```

Step 4 : Create **_Components_** for UI part and **_Services_** for connecting with the backend.

Step 5 : Run the project using **_npm start_**
 
