---
permalink: /blog/categories/
layout: default
title: Posts by category
---
{::options parse_block_html="true" /}

<div class="container-fluid">
<div class="row">
{% for category in site.categories %}
<div class="col-md-3">
{% assign category_name = category[0] %}
<h1>{{category_name}}</h1>
{% for post in site.categories[category_name] %}
[{{post.title}}]({{post.url}})
{% endfor %}
</div>
{% endfor %}

</div>
</div>