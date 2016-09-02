# Kesko HTTP Service Design

[![Build Status](https://travis-ci.org/kesko-dev/http-service-design.svg?branch=master)](https://travis-ci.org/kesko-dev/http-service-design)

::: danger
The guide is work in progress. Some advice are even contradictory and not stabilized yet.
:::

*This documentation was forked
from https://github.com/interagent/http-api-design and transformed to use
[docpress](https://github.com/docpress/docpress) instead of [GitBook](https://www.gitbook.com/)
format. The original documentation is extracted from work on the
[Heroku Platform API](https://devcenter.heroku.com/articles/platform-api-reference).*

### Goal of the document

> Support developers to create consistent and good APIs.

There are tens or hundreds of individual APIs and this guide tries to ensure that
API users can trust them to follow the same conventions. This speeds up
app development, communication, API design process, and more.

Our goals here are consistency and focusing on business logic while
avoiding design bikeshedding. We’re looking for *a good, consistent,
well-documented way* to design APIs, not necessarily *the only/ideal
way*.



## Services must

### Provide certain mandatory artifacts/actions

When a new service is created, these artifacts/actions are required:

1. API documentation as [Swagger 2.0 YAML](http://swagger.io/)

    The latest Swagger YAML should be always uploaded to IBM API Connect.

2. Public API is exposed via IBM API Connect

3. "How to get the service running" -documentation

    Preferably the service would use Docker or Vagrant to run local environment.
    This makes it easier to kickstart the development for new developers or
    maintainers joining the project.

See also [Service building tips](#service-building-tips) for additional information
how to build services.

### (TODO) Implement authentication with OpenID Connect

https://www.ibm.com/support/knowledgecenter/SSWHYP_4.0.0/com.ibm.apimgmt.apionprem.doc/tutorial_apionprem_security_OAuth.html

### Require Versioning Headers

Versioning and the transition between versions can be one of the more
challenging aspects of designing and operating an API. As such, it is best to
start with some mechanisms in place to mitigate this from the start.

To prevent surprise, breaking changes to users, it is best to require a version
be specified with all requests. Default versions should be avoided as they are
very difficult, at best, to change in the future.

It is best to provide version specification in the headers, with other
metadata, using the `Accept` header with a custom content type, e.g.:

```
Accept: application/json; version=3
```

See [Zalando versioning guidelines](http://zalando.github.io/restful-api-guidelines/compatibility/Compatibility.html#must-do-not-use-uri-versioning)
for more.

#### (TODO) When and how to bump API version

Follow [Zalando versioning guidelines](http://zalando.github.io/restful-api-guidelines/compatibility/Compatibility.html#must-do-not-use-uri-versioning).

### Require HTTPS

Require secure connections with TLS to access the API, without exception.
It’s not worth trying to figure out or explain when it is OK to use TLS
and when it’s not. Just require TLS for everything.

Ideally, simply reject any non-TLS requests by not responding to requests for
http or port 80 to avoid any insecure data exchange. In environments where this
is not possible, respond with `403 Forbidden`.

Redirects are discouraged since they allow sloppy/bad client behaviour without
providing any clear gain.  Clients that rely on redirects double up on
server traffic and render TLS useless since sensitive data will already
 have been exposed during the first call.

### Use Swagger 2.0 to describe APIs

Your APIs should be described as Swagger 2.0 YAML format. This shouldn't be
a manually maintained. It should be generated from the service's
HTTP endpoint code.

::: danger
Don't maintain API endpoints, parameters and their descriptions in multiple places.
They will go out of sync.
:::

### Provide human-readable documentation via API Connect

In addition to endpoint details, provide an API overview with
information about:

* API stability and versioning, including how to select the desired API
  version.
* Common request and response headers.
* Error serialization format.
* Examples of using the API with clients in different languages.

    API Connect does this when correct Swagger examples are specified.

### Accept serialized JSON in request bodies

Accept serialized JSON on `PUT`/`PATCH`/`POST` request bodies, either
instead of or in addition to form-encoded data. This creates symmetry
with JSON-serialized response bodies, e.g.:

```bash
$ curl -X POST https://service.com/apps \
    -H "Content-Type: application/json" \
    -d '{"name": "demoapp"}'

{
  "id": "01234567-89ab-cdef-0123-456789abcdef",
  "name": "demoapp",
  "owner": {
    "email": "username@example.com",
    "id": "01234567-89ab-cdef-0123-456789abcdef"
  },
  ...
}
```

### Use consistent HTTP methods

Method   | Description
---------|------------
HEAD     | Can be issued against any resource to get just the HTTP header info.
GET      | Get one or multiple resources.
POST     | Create a new resource. Id of the resource is unknown before request.
PUT      | Fully replace an existing resource. Id of the resource is known before request. **Note: You must send the full object on each PUT request.**
PATCH    | Add or modify attributes for an existing resource.
DELETE   | Delete an existing resources.

Good examples:

* **`GET /api/products`** Get paginated array of products.
* **`GET /api/products/:id`** Get product by id.
* **`DELETE /api/products/:id`** Delete product by id.
* **`POST /api/products`** Create a new product.
* **`PUT /api/products/:id`** Replace a products.
* **`PATCH /api/products/:id`** Add or modify attributes for a products.
* **`PUT /api/servers/:id/actions/hibernate`** Special "hibernate" action for a virtual machine.

### Special action endpoints

Prefer endpoint layouts that don’t need any special actions for
individual resources. In cases where special actions are needed, place
them under a standard `actions` prefix, to clearly delineate them:

```
/resources/:resource/actions/:action
```

e.g.

* `/products/actions/search`
* `/machines/1/actions/shutdown`

Use `POST` or `PUT` method for actions.

### Follow naming conventions

When each API follows the same rules, using the Kesko API ecosystem becomes
much easier as you can trust to certain conventions.

If some conventions are not documented, always follow existing conventions.
When introducing a new convention, there should be a plan how it will
be taken into use in all services.

::: danger
Changing API conventions across
multiple services takes time, so choose wisely.
:::

#### Use JSON naming conventions

Use camelcased attribute names, plural array keys and correct JSON types for data. You may use strings
for money to make sure the API user acknowledges that using float values is dangerous.

Example of good JSON naming conventions:

```json
{
  "id": "123e4567-e89b-12d3-a456-426655440000",
  "name": "Test Name",
  "plussaCards": [
    {
      "number": "0123123191999",
      "owner": {
        "_link": "https://keskoapi.com/api/users/123e4567-e89b-12d3-a456-426655440003",
        "id": "123e4567-e89b-12d3-a456-426655440003"
      }
    },
    {
      "number": "0123123191998",
      "owner": {
        "_link": "https://keskoapi.com/api/users/123e4567-e89b-12d3-a456-426655440003",
        "id": "123e4567-e89b-12d3-a456-426655440003"
      }
    }
  ],
  "birthYear": 1991
}
```

#### Downcase and dash-separated paths

Use downcased and dash-separated path names, for alignment with
hostnames, e.g:

```
service-api.com/users
service-api.com/app-setups
```

#### Camelcase query parameters

Use camelcase in query parameter names:

```
?isAdmin=true
?hasComment=false&minRating=1.2
```

#### Use consistent query parameter types

Type         | Good examples          | Bad examples              | Note
-------------|------------------------|---------------------------|------
**Booleans** | `?a=true`, `?a=false`  | `?a=1`, `?a=False `       |
**Arrays**   | `?id=1&id=2`           | `?ids=1,2`, `?ids=1&ids=2`| Use singular in parameter name

If your API requests are complex and need a lot of query parameters, consider
moving all parameters to a configurable body request JSON object similar to
Elasticsearch queries.

#### Minimize path nesting

In data models with nested parent/child resource relationships, paths
may become deeply nested, e.g.:

```
/stores/:storeId/assortments/:assortmentId/products/:productId
```

Limit nesting depth by preferring to locate resources at the root
path. Use nesting to indicate scoped collections. For example, for the
case above where a product belongs to an assortment belongs to a store:

```
/stores/:storeId
/stores/:storeId/assortments
/assortments/:assortmentId
/assortments/:assortmentId/products
/products/:productId
```

In other words, have only one level of parent/child relationship depth in one path.

#### Resource names

Use the plural version of a resource name unless the resource in question is a
singleton within the system (for example, the overall status of the system might
be `/status`). This keeps it consistent in the way you refer to particular resources.

### Respond structured & consistent errors

Generate consistent, structured response bodies on errors. Include a
human-readable error `message`.

```
HTTP/1.1 400 Bad Request
```

```json
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "child \"weight\" fails because [\"weight\" is required]",
  "validation": {
      "source": "payload",
      "keys": [
          "weight"
      ]
  }
}
```

Use [HapiJS Boom error payload format](https://github.com/hapijs/boom).

### Return appropriate status codes

Return appropriate HTTP status codes with each response. Successful
responses should be coded according to this guide:

* `200`: Request succeeded for a `GET`, `POST`, `DELETE`, or `PATCH` call that
  completed synchronously, or a `PUT` call that synchronously updated an
  existing resource
* `201`: Request succeeded for a `POST`, or `PUT` call that synchronously
  created a new resource. It is also best practice to provide a 'Location'
  header pointing to the newly created resource. This is particularly useful
  in the `POST` context as the new resource will have a different URL than the
  original request.
* `202`: Request accepted for a `POST`, `PUT`, `DELETE`, or `PATCH` call that
  will be processed asynchronously. E.g. if your task is processed in the background with a worker.
* `206`: Request succeeded on `GET`, but only a partial response
  returned: see [above on ranges](#divide-large-responses-across-requests-with-ranges)

Pay attention to the use of authentication and authorization error codes:

* `401 Unauthorized`: Request failed because user is not authenticated. E.g. token is not valid.
* `403 Forbidden`: Request failed because user does not have authorization to access a specific resource. E.g. the given token is not allowed to access the resource.

Return suitable codes to provide additional information when there are errors:

* `400 Bad Request`: Request was incorrectly formed. E.g. invalid json or missing required attributes.
* `422 Unprocessable Entity`: Your request was correctly formed, but contained invalid parameters. E.g. endDate is before startDate.
* `429 Too Many Requests`: You have been rate-limited, retry later.
* `500 Internal Server Error`: Something went wrong on the server, check status site and/or report the issue.

Refer to the [HTTP response code spec](https://tools.ietf.org/html/rfc7231#section-6)
for guidance on status codes for user error and server error cases.

### Use UTC times formatted in ISO8601

Accept and return times in UTC only. Render times in ISO8601 format,
e.g.:

```
"finishedAt": "2012-01-01T12:00:00Z"
```

You may have milliseconds in the timestamp too.

### Provide resource (UU)IDs

Use existing globally unique IDs when possible. E.g. use EAN codes for products
when possible to avoid creating yet another ID. You may use different IDs internally
but public API should only expose one unique ID for a resource. This one ID should be
used in resource objects, url paths etc.

::: warning
Think carefully before exposing multiple IDs for resources such as EAN and UUID.
:::

Give each resource an `id` attribute by default. Use UUIDs unless you
have a very good reason not to. Don’t use IDs that won’t be globally
unique across instances of the service or other resources in the
service, especially auto-incrementing IDs.

Render UUIDs in downcased `8-4-4-4-12` format, e.g.:

```
"id": "01234567-89ab-cdef-0123-456789abcdef"
```



## Services should

### Separate Concerns

Keep things simple while designing by separating the concerns between the
different parts of the request and response cycle. Keeping simple rules here
allows for greater focus on larger and harder problems.

Requests and responses will be made to address a particular resource or
collection. Use the path to indicate identity, the body to transfer the
contents and headers to communicate metadata. Query params may be used as a
means to pass header information also in edge cases, but headers are preferred
as they are more flexible and can convey more diverse information.

### Use Message Queue Architecture In Heavy Requests

Separate long running requests to worker processes which live independently
from request-response lifecycle. For example a video resolution scaling would be
a perfect use case for worker architecture. Good rule of thumb is that if
your processing takes >500ms, consider using a background worker.

Benefits:

* **Always fast HTTP responses (even though the actual processing might take time).** Use a ticketing or similar system to be able to poll progress information.

* **Decouple job processing from web framework.** Allows you to write the worker processing with a different language since the jobs are defined in a generic job queue.

* **Job queues are robust.** They allow retrying, alerts from increasing job queue depth etc.
  Worker can be disposed at any time and the job is still persisted in the queue.

* **Scale worker processes independently from HTTP responses.** Background processing might need different specs from the server, e.g. more CPU. HTTP serving is usually more IO-bound.

Read more: https://devcenter.heroku.com/articles/background-jobs-queueing

### Divide Large Responses Across Requests with Ranges

Large responses should be broken across multiple requests using `Range` headers
to specify when more data is available and how to retrieve it. See the
[Heroku Platform API discussion of Ranges](https://devcenter.heroku.com/articles/platform-api-reference#ranges)
for the details of request and response headers, status codes, limits,
ordering, and iteration.

### Provide Request-Ids for Introspection

Include a `Request-Id` header in each API response, populated with a
UUID value. By logging these values on the client, server and any backing
services, it provides a mechanism to trace, diagnose and debug requests.

### Support HTTP cache headers

Recommended way is using an `ETag` header in all responses, identifying the specific
version of the returned resource. This allows users to cache resources
and use requests with this value in the `If-None-Match` header to determine
if the cache should be updated.

You can also use different HTTP cache headers for specific use cases but consider
`ETag` as the default pick.

### Use JSON-LD with schema.org vocabulary

Use JSON-LD format with API response data. Link other entities by referencing to an IRI which is expected to return another schema.org entity.

Schema.org aims to create and maintain open schemas for structured data in the web. Structured data means data that is accompanied by semantics through an ontology. In other words structured data contains information about the data types and hierarchical links and relationships to other entities. JSON-LD is a format specification that extends JSON with linking capabilities. Linked data enables for example rich results in Google search.

Example of JSON-LD with schema.org vocabulary:

```json
 {
    "@context": "http://schema.org",
    "@type": "HardwareStore",
    "branchCode": "PK035-K-rauta-Lielahti",
    "name": "K-Rauta Lielahti",
    "telephone": "010 538 0300",
    "email": "lielahti@k-rauta.fi",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Turvesuonkatu 10",
      "addressLocality": "Tampere",
      "postalCode": "33400",
      "addressCountry": "FI"
    },
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Products",
        "url": "https://keskoapi.com/api/products/PK035-K-rauta-Lielahti"
    }
  }
```

Read more:
* https://schema.org/
* http://json-ld.org/

### GZip and keep JSON minified in all responses

Extra whitespace adds needless response size to requests, and many
clients for human consumption will automatically "prettify" JSON
output. It is best to keep JSON responses minified e.g.:

```json
{"beta":false,"email":"alice@heroku.com","id":"01234567-89ab-cdef-0123-456789abcdef","lastLogin":"2012-01-01T12:00:00Z","createdAt":"2012-01-01T12:00:00Z","updatedAt":"2012-01-01T12:00:00Z"}
```

Instead of e.g.:

```json
{
  "beta": false,
  "email": "alice@heroku.com",
  "id": "01234567-89ab-cdef-0123-456789abcdef",
  "lastLogin": "2012-01-01T12:00:00Z",
  "createdAt": "2012-01-01T12:00:00Z",
  "updatedAt": "2012-01-01T12:00:00Z"
}
```

You should also compress the API responses with GZip if client supports it.

### Provide full resources where available

Provide the full resource representation (i.e. the object with all
attributes) whenever possible in the response. Always provide the full
resource on 200 and 201 responses, including `PUT`/`PATCH` and `DELETE`
requests, e.g.:

```bash
$ curl -X DELETE \
  https://service.com/apps/1f9b/domains/0fd4

HTTP/1.1 200 OK
Content-Type: application/json;charset=utf-8
...
{
  "createdAt": "2012-01-01T12:00:00Z",
  "hostname": "subdomain.example.com",
  "id": "01234567-89ab-cdef-0123-456789abcdef",
  "updatedAt": "2012-01-01T12:00:00Z"
}
```

202 responses will not include the full resource representation,
e.g.:

```bash
$ curl -X DELETE \
  https://service.com/apps/1f9b/dynos/05bd

HTTP/1.1 202 Accepted
Content-Type: application/json;charset=utf-8
...
{}
```

### Provide standard timestamps

Provide `createdAt` and `updatedAt` timestamps for resources by default,
e.g:

```javascript
{
  // ...
  "createdAt": "2012-01-01T12:00:00Z",
  "updatedAt": "2012-01-01T13:00:00Z",
  // ...
}
```

These timestamps may not make sense for some resources, in which case
they can be omitted.

### Plan stability and versioning

Plan and ideally describe the stability of your API or its various endpoints according to
its maturity and stability, e.g. with prototype/development/production
flags.

See the [Heroku API compatibility policy](https://devcenter.heroku.com/articles/api-compatibility-policy)
for a possible stability and change management approach.

Once your API is declared production-ready and stable, do not make
backwards incompatible changes within that API version. If you need to
make backwards-incompatible changes, create a new API with an
incremented version number.

### (TODO) Use `_link` for foreign key relations

Serialize foreign key references with a nested object, e.g.:

```javascript
{
  "name": "service-production",
  "owner": {
    "_link": "https://keskoapi.com/api/users/01234567-89ab-cdef-0123-456789abcdef",
    "id": "01234567-89ab-cdef-0123-456789abcdef"
  },
  // ...
}
```

Instead of e.g.:

```javascript
{
  "name": "service-production",
  "ownerId": "01234567-89ab-cdef-0123-456789abcdef",
  // ...
}
```

If needed, this approach makes it possible to inline more information about the
related resource without having to change the structure of the response
or introduce more top-level response fields, e.g.:

```javascript
{
  "name": "service-production",
  "owner": {
    "id": "5d8201b0...",
    "name": "Alice",
    "email": "alice@heroku.com"
  },
  // ...
}
```

::: warning
However prefer linking to the original data instead of inlining data.
:::



## Service building guidelines

::: info
The purpose of this guide is to focus on the API design details instead
of the whole architecture, but going through the underlying architecture principles
helps to understand the whole picture.
:::

Most of the backend services are built with [microservice architecture](http://martinfowler.com/microservices/). The architecture
is used to gain certain benefits. It's not a silver bullet
but has been a good fit for the domain.

**Good resources**

* https://medium.com/wso2-insight/guidelines-for-designing-microservices-71ee1997776c#.d3wax578u
* https://www.nginx.com/blog/microservices-at-netflix-architectural-best-practices/
* http://highscalability.com/blog/2014/4/8/microservices-not-a-free-lunch.html

The following rules should apply for the services to benefit of the architecture:

### Service has a single responsibility

Align them with the business capabilities. By focusing to a single responsibility,
technology choices can be picked to suit the domain best. For example you could
model graph heavy data with a graph-database etc.

If you are unsure about the splitting, it might be a better to create a broader
service first, and split later. This way you don't end up with unnecesssary
operational overhead.

### Services are independent

For example product service can be deployed independently from product order status service.
When product order status service is down or has broken, product service should not be
affected by the incident.

Services should also have independent attached resources such as Redis, Postgres etc.

::: warning
Example smell of bad design: deploying a service requires updating another service
at the same time. Correct versioning fixes this.
:::

### Design for failures

When accessing data of other microservices, you should use their normal HTTP APIs.
Treat them as you would e.g. when integrating to GitHub API.
And as said before, assume it to be down at any time.

Each microservice should be horizontally scalable to avoid single point of failures.

### Delegate common service needs to an API gateway

For example:

* **Rate limiting**
* **Monitoring**
* **API user authentication management**
  e.g. giving access to the whole API for a 3rd party developer.
  *Different than API GW <-> Microservice authentication*

### Services should have multiple environments

Environments help in rapid development. This is a good, in practice tested, set of
environments you should have. At **minimum**, have `qa` and `prod` environments.

Environment | Purpose
------------|---------------------
`dev`       | Experimental. Sharing new features / fixes to other developers or customer. May break at any time, but should be kept as a working environment.
`qa`        | Should be as close as `prod` as possible. All deployments **must** be tested in this environment before deployment to `prod`.
`prod`      | The real deal. Used to serve end users. Response times should ideally be <100ms

All these environments should be as similar to each other as possible, e.g. have
the same external dependencies(Postgres 9.4).
