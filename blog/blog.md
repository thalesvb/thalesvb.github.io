---
permalink: /blog/blog.html
layout: default
title: Blog
--- 

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
      {{ post.excerpt }}
    </li>
  {% endfor %}
</ul>

<a href="{{site.url}}pt-br/">![Brazilian portuguese](../img/flags/1x1/br.svg){: .img-circle}</a>

<a href="{{site.url}}en/">![English (USA)](../img/flags/1x1/us.svg){: .img-circle}</a>
