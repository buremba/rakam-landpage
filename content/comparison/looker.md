---
title: Rakam vs Looker - Looker alternative
date: 2017-11-07 01:09:18 +0000
layout: page

---
Looker is a well-known analytics solution that lets you to build user interfaces for your internal organization. It basically uses their in-house language called LookML so you're expected to learn this language in order to be able to use it. Here is how it works:

1. You connect to your database from Looker.
2. Learn and adopt LookML or get their help which costs around $10K - $15K for a typical setup. You usually need at least one engineer since SQL is often not enough to learn the language if you don't have technical background.
3. Create LookML specifications that basically let Looker learn about your data layout. Then, you can create reports (explores or dashboards in their term) for different use-cases / departments in your organizations.
4. The non-technical teams in your organization can use their "Explore"s, select dimension, pivot, measure, filter their data, see it in a chart without writing any SQL code so that they can ask questions in an ad-hoc manner.
5. You also need to maintain the Looker specification which requires you to dedicate at least one technical person in your organization.

Looker is a big step in terms of empowering non-technical teams to ask more questions but maintaining it is a big hassle and since it's a generic solution which tries to cover most of the use-cases. We definitely have common features and use-cases but there's two main differentiations that make us unique:

1. We don't require you to learn any programming language and we aim to make the learning curve of newcomers as smooth as possible. You can basically use our UI to map your data, let us make your reports as interactive just using SQL. Here is the LookerML editor of Looker vs Taxonomy feature of Rakam:

<img class="col-md-6" src="/blog/uploads/2019/01/15/lookml.png" title="LookML editor" style="height: 300px;">
<img class="col-md-6" src="/blog/uploads/2019/01/15/rakam_taxonomy.png" title="Taxonomy feature of Rakam" style="height: 300px;">
P.S: Click right and see the bigger version of the picture.

As you can see, while you need to define your metrics and relations via a programing language called LookML in Looker, we have user-friendly UIs for your data analysts to map your data layout to Rakam. It significantly reduce the time to get started using Rakam and maintain using it.

1. The main feature of Looker is Explores which allows you to create metrics from your data. You basically have measure, dimension, pivot, filter options in order to drill-down the data. In Rakam, the alternative is the segmentation feature which lets you to create event metrics. You have access to all these features in Rakam so it comes down to the preference, let's see how it looks like in Rakam and Looker:

<img class="col-md-6" src="/blog/uploads/2019/01/15/looker_explore.png" title="Looker Explore feature" alt="Dimension, pivot, measure options are on the left and filters are on top." style="height: 300px;">

<img class="col-md-6" src="/blog/uploads/2019/01/15/rakam_segmentation.png" title="Rakam segmentation feature" alt="The query section is on top " style="height: 300px;">

You can also create predefined metrics that either use expressions or column aggregations in Rakam so that your non-technical people see the metrics that they're looking for without hassle.

3. While Looker only provides Explore feature as part of their reporting technology, we also provide two more features that can be used in order to ask questions which can't be answered in both Looker's Explore and Rakam's Segmentation features natively. There are funnel and retention features. If you have customer event data in your database, you can basically ask questions 'Show me users who did this event and came back and this event' or 'Show me users who did this event and continue to do the same event over the next 2 weeks' kind of questions which lets you to understand your users behaviour.