---
title: "Data Lakes: A Sneak Peek Into Their Relevance In The Big Data Community"
linktitle: "Data Lakes: A Sneak Peek Into Their Relevance In The Big Data Community"
date: 2017-10-5T01:05:21-07:00
tags: [data warehouse]
author: nkirkan
---

With so much buzz around data lakes in the big data community these days, it’s time we looked more closely at what a data lake is and how it enriches the big data and analytics sphere.Let’s begin with the *why. *Why do you need a data lake?

Why should you even care what it means or how it fits into the data analytics space?

## The Genesis of the need for data lakes

The digital revolution brought about the reduction in size of computers from mainframe sizes into personal computers and as technology evolved, the computer further reduced in size into handheld devices like mobile phones, fitness trackers, smart watches and the list goes on.

All these devices use and collate data in one way or the other, and all of that data needs to be stored for future use.

This has led to massive amounts of data being gathered by enterprises and organisations, but with a new challenge springing up: ***how do we manage all this data?***

![](https://cdn-images-1.medium.com/max/2000/0*U1XW6gKuvymgw2_r.)

So IT professionals came up with three technologies (or concepts) — the data warehouse, database, and data lake.

While all these three have their varying use cases, I’ll be covering data lakes in this article — because they offer greater flexibility, more options for analytics and data processing, and low costs on storage.

## What is a Data Lake?

Simply put, a data lake is a repository that stores or holds massive amounts of raw data in its native format, which comprises structured, semi-structured and unstructured data.

It was suggested and promoted by former CTO of Pentaho [James Dixon](https://jamesdixon.wordpress.com/2010/10/14/pentaho-hadoop-and-data-lakes/) who pointed out that the major drawback with traditional methods to analytics was the fact that storing or aggregating data just to answer questions that have been previously asked of users makes it impossible to answer new questions that may arise in the future. That’s a serious limitation.

A data lake architecture, on the other hand, gives you the ability to ask new questions whenever you want because the source data is always available and in addition, permits organizations to store data without worrying about the structure or schema yet until the data is needed (schema-on-read), thereby increasing the options available when the said data needs to be analyzed.

In a nutshell the following points explain the data lake concept:

* All data is loaded-in regardless of the form — structured (data from traditional relational databases or even spreadsheets), semi-structured (logs and XML data), unstructured (social, video, email, text etc.)

* Data is organized or schematized based on the analytical need.

Without further ado, let’s dive right into what you need to set up a data lake.

## Setting Up a Data Lake

Setting up a data lake requires careful and meticulous planning just as if you were planning your finances to buy the huge house in that upscale neighbourhood.

[Carole Gunst](https://insidebigdata.com/2016/08/22/four-best-practices-for-setting-up-your-data-lake-in-hadoop/), marketing director at [Attunity](https://www.attunity.com/), discusses best practices to setting up your data lake in Hadoop pointing out that organizations need to have a pre-defined architecture, security strategy, disaster recovery strategy and a five-year plan in place. I couldn’t agree more.

In addition to Gunst’s checklist, I would add that you need to check the current strengths of the members of your team and carefully plan human resources around that. A careful comparison of this with the goals of your data lake will guide you in making decisions on either hiring more experts or creating sessions to skill up your team members.

Conclusively, a successful data lake will basically have the following embedded in its structure:

* Data Sources which can be relational databases, semi-structured and unstructured data sources, and machine data

* Hadoop distribution

* Data ingestion — easy assimilation of data from the various sources into the HDFS, connecting relational databases, data streaming etc.

* Data query

* Data stores

* Governance — this is an important aspect of the data lake as it defines data retention policies, archiving policies, purging policies, audit or review procedures. It also ensures strong adherence to data quality regulations which prevents the data lake from turning into a data swamp.

Having highlighted all these, do you or does your business or organization really need a data lake?

## Why Data Lakes?

No time passes in the computing world without some form of shiny new technology springing up and professionals going back and forth on how the new is better than the existing. Well, this case isn’t an exception.

If you find yourself or your organization in the following scenarios, implement a data lake:

* You work for an organization where you realize that you are being limited in the types of analysis you can carry out on your data just because the available data has been pre-structured to only accommodate certain analytical styles

* Your organization has a growing amount of unstructured data or your business lines are demanding even greater amounts of unstructured data

* You need to be able to perform real-time analysis on the source data

If you are in these situations, you needed a data lake yesterday.

Data lakes open their repository doors to data from various sources giving you room to house data that spans different use cases and a much longer time span.

Remember that company you saw on the ever-busy business street you passed recently that has been operating for over 35 years? Ever wondered if they have adequate data on all customer patterns, vendors, purchases, advertising strategies, and media files that they have used throughout those 35 years? Imagine what it would have cost them if they had to do momentary backups over the years and how much expensive storage they would have consumed in the process.

Enter storage benefits.

* **Storage** — the data lake architecture is designed to work on low-cost storage which is largely common with most open-source Hadoop clusters. What this implies is the cost of storage is very low even for large amounts of data compared with data warehouses so you’ll save money. Open-source is money-saving anyway. Next is the flexibility of the data lake architecture.

* **Flexibility** — the flexibility of having data in its raw, native form makes it a great choice for you or your organization because you can determine the specific data types and sources you need, how much you need, when you need it, and the types of analytics that you need to derive.

## Let’s wrap it up here

Data warehouses are great and so are data lakes. As with all other forms of big data technology, your use case will largely determine what you eventually implement in your organization.

Data lakes as a concept have been implemented with Apache Hadoop, NoSQL technologies, and is fast growing in support from the open source community as well as being adapted by organizations for quick, real-time analysis to drive business decisions.

My advice? Learn when to combine both data warehouses and data lakes to get the best of both worlds.

## Shameless plug

*Our product, [Rakam](https://rakam.io/), is a solution that allows you to build your own analytics service using Presto. It provides an analytics infrastructure on top of your AWS account. You install Rakam on your cloud provider (AWS, Google Cloud, Azure etc.) and use our API (api link) and SDKs (SDKs link), and we store your data in ORC format in your cloud provider and use Presto to run SQL queries on top of your data. We have custom modules that take care of schema evolution, high availability and automation tools for scaling your Presto cluster. Our system is near real-time; you will be able to query your data in a minute, design your workflow, and create reports and dashboard with [Rakam](https://rakam.io/) within minutes.*
