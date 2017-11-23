---
title: "How Presto Brings The Best Out of Big Data Analysts"
linktitle: "How Presto Brings The Best Out of Big Data Analysts"
date: 2017-08-25T01:05:21-07:00
---

presto | Distributed SQL Query Engine for Big Data

If your job title resembles anything like *Data Analyst, VP Analytics, Head of Analytics, etc, *you know how critical your role is in the company.

You resume work on a typical weekday and are already faced with countless reports to churn out. The Management meeting is breathing down your neck. A client whose data is managed by your organization has called in. They want an adoption report on their cloud-based music streaming app. To do that, you need to sort through a relational database and a Hive database with tables housing billions of rows.

And this is just one illustration. You probably face even more tedious work in your company.

As a data analyst, you want to provide enough relevant data so employees in your organization can make well-informed and data-driven decisions in their respective roles.

But to deliver optimum results, you must have easy and fast access to data. The faster you are, the easier you make their jobs. The more they enjoy working with you, the harder it becomes for your employer to replace you.

You need a fast query engine that enables you to collect data from all the data sources in use by your organization into a single result so you can make speedy, data-driven decisions.

This is where [Presto](http://prestodb.io/) comes in. You probably know the history already. But if not, here’s a quick explanation for you.

## A quick background on Presto

Presto is an open source software developed by Facebook in 2013 to query databases on different sources with high speed irrespective of the volume, velocity and variety of data they contain.

![](https://cdn-images-1.medium.com/max/2000/0*8SuXatpO3VFBHViC.)

The project to build this big data query engine started in 2008 when Facebook realized they needed an engine that could query databases irrespective of where they’re located (Hadoop, Cassandra, etc). Fast forward to today, Presto is now being used by huge companies like Uber, Twitter, AirBnB, Amazon and several other enterprise businesses mainly because of its speed and capability.

“Presto makes the lives of our users a lot easier. It tremendously improves their productivity” — [Netflix](https://medium.com/netflix-techblog/using-presto-in-our-big-data-platform-on-aws-938035909fd4)

“We chose Presto as our system’s SQL engine because of its scalability, high performance, and smooth integration with Hadoop. These properties make it a good fit for many of our teams” — [Uber](https://eng.uber.com/presto/)

[Teradata](http://www.teradata.com/) provided the first ever commercial support for Presto, and afterwards, other companies like Netflix have also come on board to contribute to the open source query engine. Currently, Presto is licensed by Apache and provides an ANSI SQL compliance and a rules-based optimizer.

However, if you’re going to get the best out of Presto, it’s important you are clear on what Presto really is and is not.

## What Presto Is and Is Not

* First, Presto** IS NOT** a relational database management system. That it understands or uses SQL doesn’t mean mean it’s a substitute for traditional RDBMS like MySQL, PostgreSQL etc.

* Presto **IS** a tool designed to efficiently query vast amounts of data across different sources using distributed queries.

* If you work with terabytes or petabytes of data in your organization, chances are high you’ve been using tools that interact with Hadoop and HDFS. Presto **IS** a perfect alternative to those tools.

* Another major strength of Presto **IS** its ability to operate over different kinds of data sources including traditional RDBMS’s and other data sources such as Cassandra.

* Presto was also designed to handle data warehousing and analytics: data analysis, aggregating large amounts of data and producing report workloads — often classified as Online Analytical Processing (OLAP).

![](https://cdn-images-1.medium.com/max/2606/0*vgSs8sRjxyfeq_jm.)

[*Image source](http://getindata.com/tutorial-using-presto-to-combine-data-from-hive-and-mysql-in-one-sql-like-query/) — Relationship between the client, coordinator, worker and connectors in a sample Presto deployment scenario*

Let’s get straight into how Presto brings the best out of big data analysts:

## Easy access to data stored anywhere

Presto allows querying data where it lives — whether it’s on Hive, Cassandra, relational databases or even proprietary data stores. A single Presto query can combine data from multiple sources, allowing for analytics across your entire organization.

Regardless of where your data is stored (cloud or local storage), Presto allows easy access to data in these locations as long as the appropriate connectors for those data sources have been employed.

[Netflix](https://medium.com/netflix-techblog/using-presto-in-our-big-data-platform-on-aws-938035909fd4)’s Big Data team uses Presto on their data warehouse on Amazon S3 (a cloud storage solution provided by Amazon to store and retrieve any amount of data from anywhere):

“We had been in search of an interactive querying engine that could work well for us. Ideally, we wanted an open source project that could handle our scale of data & processing needs, had great momentum, was well integrated with the Hive metastore, and was easy for us to integrate with our DW on S3. We were delighted when Facebook open sourced Presto” — **Eva Tse, Zhenxiao Luo, Nezih Yigitbasi of Netflix’s Big Data Team.**

Next, traditional SQL syntax.

## The advantage of traditional SQL syntax

Presto uses ANSI SQL syntax and semantics to build its queries.

The advantage of this is that analysts with lots of experience with relational databases will find it very easy and straightforward to write Presto queries, reducing the downtime and lags that occur when learning an entirely new style of syntax just to analyze data.

Then there’s the Optimized Row Columnar file format advantage.

## Optimized Row Columnar (ORC)

Presto also supports the ORC file format which provides a highly efficient way to store Hive data.

Big Data analyst and former Full Stack Developer at Bloomberg, [Mark Litwintschik](http://tech.marksblogg.com/billion-nyc-taxi-rides-hive-presto.html), explains how Presto’s ORC feature makes his work easy:

“Presto’s ORC reader has the ability to skip past unneeded data, lazy reads and vectorized reads which up until recently, had yet to be ported to the Parquet reader in Presto. ORC files, much like AWS Redshift’s Zone Maps, contain the minimum and maximum value of each column per stripe (about 1 million rows) and also for every 10,000 rows. These features can bring significant performance increases for certain workloads.”

It wouldn’t be so great if it were difficult to install Presto. Fortunately, it is simple.

## Installing Presto

There are a few requirements for installing Presto:

1. Linux OS or Mac OS X

1. Java 8, 64-bit

1. Python 2.4+

1. The Presto server tarball, [presto-server-0.184.tar.gz](https://repo1.maven.org/maven2/com/facebook/presto/presto-server/0.184/presto-server-0.184.tar.gz)

The documentation at Prestodb.io for deployment is very easy to understand, and upon following the steps outlined in the documentation, you’ll have a presto server up and running in about 10 minutes. You can find the detailed documentation [here](https://prestodb.io/docs/current/installation.html).

Depending on the data sources you want to connect with, Presto also provides various connectors to ensure seamless communication between the Presto server and your data sources. Available Presto connectors include:

1. [Accumulo Connector](https://prestodb.io/docs/current/connector/accumulo.html)

1. [Black Hole Connector](https://prestodb.io/docs/current/connector/blackhole.html)

1. [Cassandra Connector](https://prestodb.io/docs/current/connector/cassandra.html)

1. [Hive Connector](https://prestodb.io/docs/current/connector/hive.html)

1. [JMX Connector](https://prestodb.io/docs/current/connector/jmx.html)

1. [Kafka Connector](https://prestodb.io/docs/current/connector/kafka.html) with a [Kafka Connector Tutorial](https://prestodb.io/docs/current/connector/kafka-tutorial.html)

1. [Local File Connector](https://prestodb.io/docs/current/connector/localfile.html)

1. [Memory Connector](https://prestodb.io/docs/current/connector/memory.html)

1. [MongoDB Connector](https://prestodb.io/docs/current/connector/mongodb.html)

1. [MySQL Connector](https://prestodb.io/docs/current/connector/mysql.html)

1. [PostgreSQL Connector](https://prestodb.io/docs/current/connector/postgresql.html)

1. [Redis Connector](https://prestodb.io/docs/current/connector/redis.html)

1. [SQL Server Connector](https://prestodb.io/docs/current/connector/sqlserver.html)

1. [System Connector](https://prestodb.io/docs/current/connector/system.html)

1. [Thrift Connector](https://prestodb.io/docs/current/connector/thrift.html)

1. [TPCDS Connector](https://prestodb.io/docs/current/connector/tpcds.html)

1. [TPCH Connector](https://prestodb.io/docs/current/connector/tpch.html)

## Running Presto Queries on Multiple Sources

As I mentioned earlier, Presto allows you to run queries on multiple data sources at once and return a single result table using SQL statements.

Its ability to integrate with various data sources located anywhere means you can connect with Cassandra, PostgreSQL, Accumulo, Hive, and MongoDB, and pull data from these sources into a single result view using Presto’s SQL syntax.

To better illustrate this, I’ll outline an example using a MySQL table and a Hive table. Please note that for this process to occur without errors you must have:

1. integrated Presto with MySQL and Hive following the steps outlined in the [MySQL](https://prestodb.io/docs/current/connector/mysql.html) connector and [Hive](https://prestodb.io/docs/current/connector/hive.html) documentation respectively.

1. Have tables with data already populated in your data sources

For our example, I have the MySQL database having a table called ***Users*** that stores information on all users with profiles on a music streaming service and a ***Listened Tracks*** table in a Hive database housing a list of tracks that have been played by all users.

I will be executing the query in the Presto CLI (command line interface) and the expected result would be the number of users from a particular country that have played music so far with the results limited to just 5 rows.

![](https://cdn-images-1.medium.com/max/2000/0*BlfyDAvF4tbbqwYB.)

And the result:

![](https://cdn-images-1.medium.com/max/2000/0*V9N8mIavtbIlPnkp.)

## Okay, let’s wrap it up here

Presto’s support for the ANSI SQL syntax, ORC file format, multiple data sources, super fast query execution even on large data sizes (compared to other SQL on Hadoop engines) and continuous support from the open source community (with Teradata leading the pack) makes it a query engine any data analyst looking to increase productivity should greatly consider.

## ***Shameless plug***

*Our product, Rakam is also a solution that allows you build your own analytics service using Presto. It provides an analytics infrastructure on top your AWS account, you install Rakam on your cloud provider (AWS, Google Cloud, Azure etc.) and use our API (api link), SDKs (SDKs link) and we store your data in ORC format in your cloud provider and use Presto to run SQL queries on top of your data. We have custom modules that takes care of schema evolution, high availability and automation tools for scaling your Presto cluster. Our system is near real-time, you will be able to query your data in a minute, design your workflow and create reports and dashboard with Rakam within minutes.*

## ***Check-out our platform: [http://rakam.io](http://rakam.io)***
