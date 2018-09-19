---
title: "Data Security: How Safe Is Your Data With Presto?"
linktitle: "Data Security: How Safe Is Your Data With Presto?"
date: 2017-10-25T01:05:21-07:00
tags: [data warehouse,presto,security]
author: buremba
---

Imagine you resume work and realize that your data has just been compromised. Months and years of data all maliciously tampered with and there’s no idea where it all went wrong.

### Take John…

John manages data at a company called ABC Technology. One morning, he’s asked to look for a better query engine that can manage the company’s gigabytes and petabytes of data. After hours and days of searching, he finally selects a solution, tries some data on it, and everything looks good — data well managed and all.

So John decides to use this big data query solution to run the company’s data. But the story changes here. Virtually every aspect of ABC Technology’s data gets scrambled, and there was hardly anything anyone could do to remedy the situation.

There is no nightmare as hellish as this for any organization managing gigabytes and petabytes of data. In fact, a major deciding factor in choosing data querying engines is how secure the connection to the data source is.

I’ll be discussing how Presto solves this security challenge but first, a quick introduction to Presto. In my [last post](https://blog.rakam.io/how-presto-brings-the-best-out-of-big-data-analysts-2eac50ef4f78), I defined what Presto is. But here it is again — just in case you didn’t read that one:
> *Presto is a distributed SQL query engine designed to query large data sets distributed over one or more heterogeneous data sources.*

And as I pointed out [before](https://blog.rakam.io/how-presto-brings-the-best-out-of-big-data-analysts-2eac50ef4f78), Presto has the ability to pull results from different data sources (Hive, MySQL, Cassandra etc.) in just one query. The post even described a scenario where queries were executed against a Hive data store and a MySQL database.

Now that you have an idea what Presto is and what it does, let’s dive right into how it handles data security.

### First, to prevent unauthorized data access, Presto uses the Kerberos authentication. So let’s begin with that…

## Kerberos Authentication for the Coordinator

Presto uses the Kerberos authentication over HTTPS on its coordinator for clients such as the Presto CLI, or the JDBC and ODBC drivers.

To enable this authentication for Presto, configuration changes are made on the coordinator. No changes are required to the worker configuration as such; the worker nodes will continue to connect to the coordinator over unauthenticated HTTP.

**Note:** *Worker nodes cannot yet be configured to connect to the Presto coordinator using HTTPS or to authenticate with Kerberos. It is the administrator’s responsibility to enable unauthenticated access over HTTP for worker nodes and ensure unauthenticated access is blocked for any node that is not a worker node. For nodes that are not worker nodes, block access to the Presto coordinator’s HTTP port. Source: [Prestodb.io](https://prestodb.io/docs/current/security/server.html)*

In setting up this authentication method, the following have to be configured on the environment prior to configuring the Presto coordinator to use Kerberos authentication over HTTPS:

1. [Kerberos Services](https://prestodb.io/docs/current/security/server.html#server-kerberos-services) — a Kerberos KDC (Key DIstribution Center) running on a node that the Presto coordinator can reach over the network. The KDC is responsible for authenticating principals and issuing session keys that can be used with Kerberos-enabled services. KDCs typically run on port 88, which is the IANA-assigned port for Kerberos.

1. [MIT Kerberos Configuration](https://prestodb.io/docs/current/security/server.html#server-kerberos-configuration)

1. [Kerberos Principals and Keytab Files](https://prestodb.io/docs/current/security/server.html#server-kerberos-principals)

1. [Java Keystore File for TLS](https://prestodb.io/docs/current/security/tls.html#server-java-keystore)

1. [System Access Control Plugin](https://prestodb.io/docs/current/develop/system-access-control.html)

Once the environment has been properly configured, the next step is to configure the Presto Coordinator node. A detailed guide on that can be found [here](https://prestodb.io/docs/current/security/server.html).

### Next, CLI Kerberos authentication.

## Kerberos Authentication for the CLI client

Presto’s [Command Line Interface (CLI)](https://prestodb.io/docs/current/installation/cli.html) can be set up to connect to a Presto coordinator that already has Kerberos authentication enabled — which is done by setting up the environment before configuring the CLI. To set up the environment for CLI Kerberos Authentication, the following have to be executed:

* Kerberos Services — a Kerberos KDC (Key Distribution Center) running on a node that in this case, the client can reach over the network.

* MIT Kerberos Configuration

* Kerberos Principals and Keytab files

* Java Cryptography Extension Policy Files

* Java Keystore File for TLS

*You can find further documentation [here](https://prestodb.io/docs/current/security/cli.html)*

### Now we’ll talk about the LDAP authentication method.

## LDAP Authentication

Presto can be configured to enable frontend LDAP (Lightweight Directory Access Protocol) authentication over HTTPS for clients, such as the Presto CLI, or the JDBC and ODBC drivers. At present, only a simple LDAP authentication mechanism involving a username and password is supported.

***Note: Only the communication from the clients to the coordinator is authenticated***.

Want more information on how LDAP works on Linux systems? Check out this [post](http://www.tldp.org/HOWTO/LDAP-HOWTO/howitworks.html).

### Another security feature Presto uses are the Java keystores and truststores, so let’s dive into that.

## Java Keystores and Truststores

**Java Keystore file for TLS**

Java keystore files help store authorization certificates — public key certificates with corresponding private keys — and Presto uses this file for its TLS configuration.

Keys in the keystore file are generated using the **keytool** keyword. A sample keystore file setup is explained in the screenshot below.

![](https://cdn-images-1.medium.com/max/2000/0*agSP-wQbx3a_mOdT.)

[*Image Source](https://teradata.github.io/presto/docs/current/security/tls.html)*

Note the prompts the system gives for the first and last name. A suitable response is the unqualified hostname of the Presto coordinator which is the common name that should be used in the certificate.

**Java Truststore file for TLS**

Java truststore files are storage containers for trusted certificates of trusted TLS/SSL servers or of Certificate Authorities trusted to identify servers. To secure access to the Presto coordinator through HTTPS, clients can configure truststores. If the Presto CLI is to trust the Presto coordinator in a secure connection, then the coordinator’s certificate must be imported into the CLI’s truststore.

Please note that you can either import the certificate to the default Java truststore, or to a custom truststore, and should you choose to use the default one, great caution must be exercised as you may need to remove the certificates of Certificate Authorities you do not deem trustworthy.

You can also use the **keytool** keyword to import certificates to the truststore.

Presto also prevents unauthorized access to data by using the System Access Control plugins which we’ll discuss in the next section.

## Built-in System Access Control

System access control plugins enforce authorization at a global level before any connector level authorization. There are two kinds of plugins that can be used in this case:

1. Presto’s built-in plugins which can be used to implement the system access control

1. Self-developed plugins (if you prefer a little tech adventure) by following the guidelines in this [documentation.](https://prestodb.io/docs/current/develop/system-access-control.html)

If you prefer to go the route using Presto’s built-in plugins, it is important to note that Presto provides three plugins to implement system access control:

* **Allow All System Access Control**

This plugin is enabled by default and permits all operations. This implies that operations that read data or metadata like SHOW or SELECT, as well as operations that write and modify data or metadata such as CREATE, INSERT, and DELETE are all permitted.

* **Read Only System Access Control**

With this plugin, you are allowed to execute any operation that reads data or metadata, such as SELECT or SHOW. Setting system level or catalog level session properties is also permitted. However, any operation that writes data or metadata, such as CREATE, INSERT or DELETE, is prohibited.

* **File Based System Access Control**

With this plugin, access control rules are specified in a file in JSON (JavaScript Object Notation) format.

It should be noted however, that this plugin only supports catalog access control rules. Should you intend to limit system access in another way, then implementation of a custom *SystemAccessControl* plugin is greatly advised.

### So let’s discuss what catalog access control rules are and how they are used.

### Catalog Rules

Catalog rules give the administrator the ability to control the catalogs a particular user can access and each catalog rule consists of the following parameters:

* **user** — optional regex to match against username

* **catalog** — optional regex to match against catalog

* **allow** — required boolean indicating whether a user has access to the catalog or not

The following example restricts access to user samsteve for the system catalog but grants access to all users to the MySQL and Hive catalog:
> {
 “catalogs”: [
 {
 “user”: “samsteve”,
 “catalog”: “system”,
 “allow”: false
 },
 {
 “catalog”: “(mysql|hive)”,
 “allow”: true
 },
 ]
}

Please note that by default, all users are granted access to the system catalog but you can restrict this by adding a rule just like I did for “samsteve” in the example above. The only difference is that you’ll exclude the user parameter just like this:
> {
 “catalogs”: [
 {
 “catalog”: “system”,
 “allow”: false
 },
 ]
}

An outstanding security feature, Presto has the flexibility administrators need to configure secure communication between nodes in its cluster.

## Secure Internal Communication

Presto allows room to configure secure communication between its nodes. The communication is secured with SSL/TLS and is configured in the *config.properties* file.

It is important to note that the SSL/TLS on the worker and coordinator nodes are configured using the same set of properties and while every node in the cluster must be configured, do bear in mind that nodes that have not been configured, or are configured incorrectly, will not be able to communicate with other nodes in the Presto cluster.

To enable SSL/TLS for Presto internal communication, you’ll need to do the following:

1. Disable the HTTP endpoint. It is important to disable the HTTP endpoint even after HTTPS has been enabled. You will have to do that manually using the following command:

http-server.http.enabled=false

***Please note that should you choose to leave the HTTP endpoint enabled, (which in most cases is a security hole), then a firewall is greatly advised to ensure access to HTTP endpoints are only granted to hosts that should be allowed to use it***.

1. Configure the cluster to communicate using the fully qualified domain name (fqdn) of the cluster nodes.

1. Generate a Java Keystore File. Every Presto node must be able to connect to any other node within the same cluster.

1. Distribute the Java Keystore File across the Presto cluster.

1. Enable the HTTPS endpoint. You can do that by inputting the following commands:

http-server.https.enabled=true
http-server.https.port=<https port>
http-server.https.keystore.path=<keystore path>
http-server.https.keystore.key=<keystore password>

1. Change the discovery URI (Uniform Resource Identifier) to HTTPS
> discovery.uri=https://<coordinator fqdn>:<https port>

1. Configure the internal communication to require HTTPS
> internal-communication.https.required=true

1. Configure the internal communication to use the Java keystore file
> internal-communication.https.keystore.path=<keystore path>
internal-communication.https.keystore.key=<keystore password>

## In Conclusion

Presto uses industry standard technologies to manage your data and secure it from unauthorized access. If you are still on the fence about deploying Presto, perhaps because you aren’t entirely sure your data is secured with it, you can be rest assured it is.

From Kerberos authentication, LDAP authentication, java truststores and keystores, and built in system access controls to secure internal communication, querying your data with Presto is safe.

## Shameless plug

Rakam is a solution that allows you to build your own analytics service using Presto. It provides an analytics infrastructure on top of your AWS account. You install [rakam](http://rakam.io) on your cloud provider (AWS, Google Cloud, Azure etc.) and use our [API](http://rakam.io/product/api) and [SDK’s](http://rakam.io/docs) and we store your data in ORC format in your cloud provider and use Presto to run SQL queries on top of your data. We have custom modules that take care of schema evolution, high availability and automation tools for scaling your Presto cluster. Our system is real-time; you will be able to query your data in a minute, design your workflow, and create reports and dashboard with [rakam](http://rakam.io) within minutes.
