---
title: "SQL is still superior for big-data analytics"
linktitle: "SQL is still superior for big-data analytics"
date: 2017-05-25T01:05:21-07:00
---

I wanted write about using only SQL for analytical queries (possibly for big-data) because when I talk about SQL, people usually tend to say that it’s not a good fit for analytics and they have to write complex code in Java or use a NO-SQL solution that has custom query language because in big-data world, all the paradigms should be changed and become complex.

I actually like Mixpanel because of its simplicity but since they argue that SQL is so old and we need JS or JSON as query language, it will try to answer their arguments about SQL because when I look into their landing page, I have a lot to talk about.

Here is an comparison with JQL and SQL from their [landing page](https://mixpanel.com/jql/)

![](https://cdn-images-1.medium.com/max/4464/1*Aclyp56t379HLlwsa7KjyA.png)

I will discuss the limitations about JQL and SQL but first of all, I must say that I’m not aware of any analysts who are more familiar with Javascript than SQL. SQL is well-known among developers, it’s even studied in undergraduate classes.
> 1. SQL is meant for rigid schemas for traditional relational databases

This is a common misconception. SQL is not RDBMS, it’s a query language mostly used by RDBMSs but recently even NO-SQL solutions such as Cassandra switched to SQL for their query language. You can have MAP and ARRAY types in SQL, define schema at query time or even introduce a VARIANT type for unstructured data similar to [what Snowflake did](https://www.snowflake.net/blog/snowflake-sql-making-schema-on-read-a-reality-part-1-2). The author in the post also mentioned another problem which I will talk about why we always (almost) need a schema.
> 2. Difficult to manipulate and transform the data

You can easily use expressions inside SQL, use UDF to manipulate the data. Most of the SQL engines even try to simplify the expression you wrote, compile it to native code and run it efficiently but with Javascript, you’re stuck with the V8 compiler which is mostly designed for browsers and backend servers (node.js). However, I’m aware that a real scripting language such as JS can be better if you need loops, complex transformations and that’s why we have UDFs in SQL. For example, Google BigQuery uses [JS for UDFs](https://developers.googleblog.com/2015/08/breaking-sql-barrier-google-bigquery.html) and advices us to filter the rows before passing them to our UDF functions defined with JS because while SQL has statically typed [AOT](https://en.wikipedia.org/wiki/Ahead-of-time_compilation) compiler, JS has a compiler with [JIT](https://en.wikipedia.org/wiki/Just-in-time_compilation) and dynamic typing. Another issue is that you cannot have mutable state in Javascript because the data is distributed and unless you can run the whole query in a single JS virtual machine, you need to share the mutable state in the distributed environment which is quite hard. Mixpanel currently allows mutable state and I believe that the queries run on a single instance, it doesn’t let me set a wide date range so they seems to have data limits for JQL queries.
> 3. Complex queries because unwieldly to read & compose

Ah, I will demonstrate an example for you and use the example query in [Mixpanel’s JQL landing page](https://mixpanel.com/jql/):

![](https://cdn-images-1.medium.com/max/2804/1*ZGVXTBTTyBAvQO4L8nk1hg.png)

One can write the same query in SQL as follows:
> SELECT page_type, count(*) from “Song played”
> GROUP BY page_type
> WHERE time between timestamp ‘2015–7–1’ and timestamp ‘2015–7–31’

I don’t know about your preference but you might guess about my opinion. However; I’m aware that behavioral analytic queries such as funnel and retention is not easy write in SQL since every single action may cause a state change, people usually chain JOINs in order to perform funnel queries but they’re expensive. However we have *workarounds* for this problem, just use UDFs and pass the raw data to them. We use this approach in Rakam and it works just fine. In order to simplify, we do have f[unnel endpoint](http://api.rakam.io/#funnel) and even for that, the developers can see the underlying SQL queries that are executed for funnel analysis. If they need to perform even more complex queries, they can just copy the SQL and alter it as they wish. Clickhouse data-warehouse also use [similar approach](https://clickhouse.yandex/reference_en.html#sequenceMatch%28pattern%29%28time,%20cond1,%20cond2,%20...%29) in Yandex Metrika.
> 4. Limited flexibility due to query functions available in SQL

Query functions are not restricted in ANSI SQL standard. The engines may implement any function and you can also define user defined functions (UDF). With javascript, you also do not have that many global functions, you usually define them. SQL is specifically designed as query language whereas JS is a scripting language. When you write some JS code, if the compiler is able to compile and run it without any runtime exception, it will be executed just fine and return the result to you without verifying it. On the other hand SQL knows that it will be executed on a dataset, it tries to understand the query and if it’s not valid, will warn you. If’s valid, it understands what you’re trying to do and optimizes the query, find outs the best plan it should execute by looking the underlying data schema and location and generate native code just for your SQL query.

For the last a two years, the big-data ecosystem tries hard to implement SQL as their query language. Spark developers tries hard to improve their SQL engine for the last 1.5 years, ([commit history](https://github.com/apache/spark/commits/master/sql)), Cassandra replaced its query engine with SQL-ish language, new distributed databases such as Cockroach and Influxdb uses SQL and finally new generation big-data in-memory database engines such as Impala, Presto and Drill allow us to run SQL queries on our data-set in a distributed environment without hassle.

Some database engines such as Elasticsearch prefer to use JSON as query language but considering their use-case, I find them reasonable. However just look at [this repo](https://github.com/NLPchina/elasticsearch-sql) that implements third-party SQL support for Elasticsearch, people tend to use what they’re familiar with.

I believe that SQL is enough for both batch and stream processing and on top of them, you can easily build your custom analytics services, that’s what we do at [Rakam](https://rakam.io). We use Presto for ad-hoc analysis and implemented incremental materialized views and continuous query support on top of Presto’s query execution engine, just [try it out](https://rakam.io/doc/).
