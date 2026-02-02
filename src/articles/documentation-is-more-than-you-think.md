---
title: Documentation is more than you think
description: Everything that is involved in making great documentation everywhere and all at once.
date: 2026-02-03
---

Documentation is an essential part of every product — it's a complex, evolving web of knowledge that must resonate with users, educate them, and justify a product. Despite its value, it is often an overlooked, undervalued, and underinvested aspect of many companies.

For the past three years, I've worked on [the Astro documentation](https://docs.astro.build/) and learned so, so much about writing great documentation that is read and loved by millions of users. Here, I illustrate how much it takes to write docs like Astro, practical examples of its value, and hopefully, it can serve as a solid case for more investment and consideration for documentation at your company.

:::note
This article focuses mostly on the perspective of a company and its product's documentation (that is, public-facing docs), but it is applicable to other types of docs and projects of any size or type.
:::

## It is the source of truth

The documentation is the **source of truth of your product**. If something isn't there, it doesn't exist. It might be a really helpful and innovative feature, a relevant tip to using your product, or clarification about a specific subject matter.

Neither search engines nor AI will index the information inside your login-protected single-page application. People wanting to test and adopt your product may look into the documentation or search for a feature before creating an account and paying for it. If by then what they're looking for and what would convince them to adopt your product can't be found, then you're losing users, money, and momentum.

Even worse, you should be worried and on the lookout for what _is_ there. Let's say your documentation has a lovely AI chatbot to guide users. Now, what happens if it gives outdated or misleading information about your pricing model, policies, etc? — You don't need to think: [Air Canada was considered liable for this reason](http://americanbar.org/groups/business_law/resources/business-law-today/2024-february/bc-tribunal-confirms-companies-remain-liable-information-provided-ai-chatbot/).

Depending on your size, legal action might not be a worry, but we don't even need to go that far. Missing, misleading, or wrong information is a classic source of frustration for users, and a symptom of documentation being treated as an afterthought and not a part of your product development process. Surely, you believe your users deserve better, right?

## It is your guide to a better product

One of my favorite things about documentation is that **it guides you to a better product**. If documenting something is hard, leaks implementation details, or conflicts with existing information, it has naturally found a point of improvement in your product!

At Astro, we have the culture of every feature being reviewed and validated by the docs team: the reviewers look at the feature, the WIP docs, and validate it with the user's perspective — frequently, the reviewers give feedback that results in changes in API names and structure, use cases, and even behavior.

I like to call it a type of dogfooding, from the perspective of someone less technically involved with the feature — after all, the user of a product _generally_ isn't its own developer, and documentation is written with the average user in mind, helping you see what you usually wouldn't.

Some folks go even further and make documentation the core of it all, through [Documentation-Driven Development (DDD)](http://writethedocs.org/videos/portland/2019/lessons-learned-in-a-year-of-docs-driven-development-jessica-parsons/). Instead of implementing first, you write the necessary docs, and reap the benefits of finding API issues, behavior inconsistencies, and more before wasting hours of implementation time — and since you just saved hours, you are more willing to change direction (drastically or not) as needed than if you had everything done and are now hit with the feeling of being back to square one.

Regardless of the workflow or philosophy you choose, the key lesson is that documentation should be treated with care and priority, integrated as part of your product development. That is ultimately going to distinguish you from the competition, make your users happier, and increase adoption.

## It is a perception of quality

The state of your documentation **is a perception of quality** about your product and company. If you want it to be seen as the "Apple of X", then your docs have to be equally polished.

Put yourself in the shoes of a user: they open your beautiful landing page, go in the docs to learn more and what they see is typos, inconsistencies, confusing navigation, and so on — you signaled your product is only looks, and if docs weren't given any polish, what can guarantee the product is any better or even worthy of their data, money, and time?

If you want people to look into your product and believe it's a worthy investment, you have to show your company is mature and serious — and I don't mean that in a brand/tone way, it can be silly and fun, but you should always treat your users seriously and with respect.

Think of a signature restaurant: you have a big staff, an even bigger hall, and lots of customers. You have to serve the same plates with the same taste for everyone, all tables should be clean and include the same cover and condiments on top — that's why people visit that restaurant, it's an excellent, consistent experience you can trust; and that's how your docs should feel.

The two mistakes I see many companies make:

- They lack a [writing and style guide](https://learn.microsoft.com/en-us/style-guide/welcome/): it's a really important document to outline the tone, style, and decisions made on content. Without it, the many "chefs" in your documentation work all over each other; every page seems to have been made by someone different (you're not writing an anthology!), and decisions are lost to time. That all means, docs also need docs!

- No one is responsible for it: your documentation needs a "head chef", they're the one responsible for ensuring everything is following the recipe and standards set. Generally, this should be your Senior/Staff Technical Writer or Docs Lead.

Investing in documentation is investing in quality. The same way you need someone to architect the words that are written for the computer so that it's clean, efficient, and maintainable, you need someone who architects the words that are written for the much less precise, imperfect, and more critical human beings.

## It is built with empathy

If there's something you should learn about documentation, it is that **it is built with empathy**. Again, you write documentation not with _you_ in mind, you write it for someone else, the user. Do you know how much you might be different from them? Let me illustrate for you:

- They might be from somewhere else: English, for example, might not be their main language, and they might be geographically unable to access content or platforms you might take for granted.

- They might have a different level of experience: what is easy or obvious for you might not be for them; there's no "common knowledge", and you should always account for that.

- They might be from a different background: socially and economically, they might not have the same privileges, conditions, tools, and money available.

- They might be in a different mental state: your content is being read during production issues and complications, your user might be stressed and definitely deserves to have an easy time reading a well-structured, no-fluff documentation.

- They might be physically and neurologically different: people have [permanent, temporary, and situational disabilities](https://accessibility.education.gov.uk/training/accessibility-inclusion/page-8) and according to the World Health Organization, [16% (1 in 6) of the population suffer from significant disability](https://www.who.int/news-room/fact-sheets/detail/disability-and-health), plus the rotating temporary and situational disabilities, mean that **A LOT** of people need accessibility features and consideration.

Let's turn that more actionable. First, you should have a great documentation infrastructure. If you don't want to build one from scratch, there are several good options in the open-source community — I'm biased, but I recommend [Starlight](https://starlight.astro.build/) with closed eyes. A good tool will considerably improve accessibility, readability, and other concerns for you.

Second, you should audit and police your content and infrastructure — frequently, docs are **never** done! — so that the concerns mentioned previously are all accounted for. A few of the things great documentation teams keep in mind:

- Ensure [links are descriptive, user-friendly, and perceivable](https://webaim.org/techniques/hypertext/link_text).
- Use [inclusive communication](https://www.gov.uk/government/publications/inclusive-communication).
- Opt for [gender-inclusive language](https://www.unwomen.org/sites/default/files/Headquarters/Attachments/Sections/Library/Gender-inclusive%20language/Guidelines-on-gender-inclusive-language-en.pdf).
- Add helpful [alternative text for non-text content](https://www.section508.gov/create/alternative-text/).
- Simplify the [writing for a global audience](https://developers.google.com/style/translation).
- Avoid [words like "simply", "just", and "obviously"](https://jameshfisher.com/2017/02/22/dont-use-simply/).
- Include [automated accessibility testing](https://www.deque.com/axe/devtools/).

All of this is a great starting point, but remember: I do not know everything, I cannot write everything, and there are definitely more things you should be sensible, careful, and attentive to. The key is to be empathetic to your users, actively think and reflect while you write, take their feedback, and continuously learn so that you can make better documentation. After all, **with great docs comes great responsibility**.

## It is not linear

One thing you shouldn't expect is for your users to read all pages, or read them sequentially. After all, documentation is not a novel, and **it is not linear**.

Your content has to be architected across the types of information the user is looking for. It has to be intuitive, quick to find, and well structured. If a page requires knowledge of a previous page or other things, use a link or include a prerequisites section instead of writing things like "now that you've" or "after you've". Keep category names predictable, like "Guides", "Tutorials", and "API Reference" over "The Nomicon" or "Wizard's Spells".

When it comes to structuring your documentation, I cannot recommend [Diátaxis by Daniele Procida](https://diataxis.fr/) enough. It's, as it calls itself, a "systemic approach to technical documentation authoring", going over a few forms of documentation and how to write them.

We use Diátaxis' approach in the Astro documentation, and if its reputation is worth something, then it shows that it really helps build loved documentation.

## It is part of your strategy

This is something people don't think enough about. Your documentation **is part of your strategy**. You might've heard of ["show, don't tell"](https://en.wikipedia.org/wiki/Show,_don%27t_tell) in narrative storytelling before, and I believe it also applies to documentation. By strategy, I mean how you position your product, what you highlight, and what differentiates you from the competition.

To expand on that, your marketing is "tell", it's the _exposition_ of what you want people to think and believe about your product. For example, your landing page has some amazing, non-descriptive buzzwords like "The future of building happens together" (stolen from GitHub). It's cute, of course, but it means _nothing_. Your docs, on the other hand, are "show". It's in the docs that you prove your vision, showing how your product and its features enable the user to do what you promised, and what makes it unique.

I don't mean for you to start selling in your documentation. For example, don't add buffer words and fluff like "this amazing feature..." — that's tell, not show! But, a good writer will **naturally** position what's most relevant, unique, and valuable about your product. For example, here's this excerpt in [Astro Docs' "Front-end frameworks" guide](https://docs.astro.build/en/guides/framework-components/):

> By default, your framework components will only render on the server, as static HTML. This is useful for templating components that are not interactive and avoids sending any unnecessary JavaScript to the client.

See how the value of a feature, and Astro by extension, was demonstrated naturally? It didn't need any buzzwords; it just explained how a feature works, and that fed into the reasoning of what makes it unique. That's a great content strategy, and things like this should be sprinkled all over your product's documentation.

As your company and products grow, features might become more or less important, interconnect, and more. It's also the docs' responsibility to prioritize, mention, and discourage them as things change.

A common mistake I see is adding a new feature or product, and not looking into your documentation for places where it might be useful to mention it. Not all your users will look into your social posts, blog, or that specific feature's or product's page. Documentation is also a form of propagation, and you should use it to its fullest.

## It is an entry point for your community

Especially when working in an open-source project, documentation **is an entry point for your community**.

Documentation should always be the easiest way for someone to join your community. It takes a typo, a small grammar issue, or some missing information for them to get into action and join your Discord, ask for confirmation, and make a pull request.

Of course, that only happens if you do your part. Make it so they can contribute without even cloning your repository: add a "Edit this page" button that opens in your Git hosting's web editor and share resources on contributing to your project. If they need to clone your repo, then ensure your setup is simple. Have instructions in `README.md` and use only one language or framework. Ideally, they should only need to run `npm install` and `npm run dev` (or the equivalent) to see local changes, make their changes, and commit and push.

Now, a mistake is to think that it will only attract low-quality contributions and contributors. That's not true. Engineers have a bad habit of looking down on non-technical contributions and assume that speaks to their knowledge and experience level. Of course, if the entry barrier is lower, you're expected to see more beginners, but that's a consequence of making things easier for everyone, and that's great!

I am really proud of having welcomed many of our amazing, intelligent, and hardworking maintainers in their first contributions, and these were mostly small documentation improvements or translations. If making that first contribution wasn't so easy, they might've never contributed to the project in the first place, which fortunately isn't the case. Some of them proceeded to then contribute to the Astro compiler, core, or even crazier things like running Rust inside Astro's component template — I kid you not.

That's why you should do the same! The harder being part of your community is, the more amazing people who could help you build that dream you're losing. Or as the sensationalist tech bros like to say: "you're not gonna make it" (NGMI).

## And what about... AI?

I know some of you. Thinking most of what's here is less relevant because "AI is now one of the main readers of documentation". I'll give you a counterpoint.

Of course, you can augment your documentation for AI, including copy to Markdown buttons, response as Markdown, etc. But do you know one of the most helpful things to AI? Clear, concise, and well-structured docs. Don't forget, AI is just a simulation of how our brains work, and if a human doesn't have an easy time with your documentation, neither is AI going to — surprising, right?!

If you like to use it, go on. AI can help you write, but shouldn't write for you. It can help you think of different words or ways to express an idea, find typos, and check against your writing/style guide. It cannot, though, have empathy for your users, or think on a macro scale about your entire content — it has a limited context, after all.

And definitely it shouldn't _replace_ documentation as a whole. I don't need to remind you [what happened to Air Canada](http://americanbar.org/groups/business_law/resources/business-law-today/2024-february/bc-tribunal-confirms-companies-remain-liable-information-provided-ai-chatbot/), right? You're smart, act accordingly.

## Who can do all that?

In an ideal world, everyone on a team is accountable for the quality of documentation and works as hard to make it good, but it's natural for it not to be everyone's cup of tea, and it's hard to keep track of all of this if it isn't your full-time focus.

If you want someone who can help you bring all of this to your company and product, hire a Technical Writer, Content Engineer, Documentation Engineer, or Developer Experience Engineer — want to make it even easier? Hire me, then.

:::danger[Desperate much?]
I'm serious. [I need a job](https://www.linkedin.com/in/yanthomasdev/). Send help.
:::

Do not mistake this with a Developer Relations Engineer — I believe that's a different role, more focused on social media content, outreach, and interacting with the larger developer community. Don't try to be smart and hire someone as a 2-in-1 deal; spreading someone thin over such a surface area will just leave you with half of each, instead.

For this work, you want someone who is focused on the backstage, that is going to nerd out about your content structure, your users' reading experience, and what everyone else on the team is writing.
