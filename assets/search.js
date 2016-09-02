window.__searchindex=({
  "index.html": {
    "title": "Kesko HTTP Service Design",
    "pagetitle": "Kesko HTTP Service Design",
    "slug": "index.html",
    "body": "\nThe guide is work in progress. Some advice are even contradictory and not stabilized yet.\n\nThis documentation was forked\nfrom https://github.com/interagent/http-api-design and transformed to use\ndocpress instead of GitBook\nformat. The original documentation is extracted from work on the\nHeroku Platform API."
  },
  "index.html#goal-of-the-document": {
    "title": "¶ Goal of the document",
    "pagetitle": "Kesko HTTP Service Design",
    "slug": "index.html#goal-of-the-document",
    "body": "\nSupport developers to create consistent and good APIs.\n\nThere are tens or hundreds of individual APIs and this guide tries to ensure that\nAPI users can trust them to follow the same conventions. This speeds up\napp development, communication, API design process, and more.\nOur goals here are consistency and focusing on business logic while\navoiding design bikeshedding. We’re looking for a good, consistent,\nwell-documented way to design APIs, not necessarily the only/ideal\nway."
  },
  "index.html#services-must": {
    "title": "¶ Services must",
    "pagetitle": "Kesko HTTP Service Design",
    "slug": "index.html#services-must",
    "body": ""
  },
  "index.html#provide-certain-mandatory-artifactsactions": {
    "title": "¶ Provide certain mandatory artifacts/actions",
    "pagetitle": "Kesko HTTP Service Design",
    "slug": "index.html#provide-certain-mandatory-artifactsactions",
    "body": "When a new service is created, these artifacts/actions are required:\n\n\nAPI documentation as Swagger 2.0 YAML\nThe latest Swagger YAML should be always uploaded to IBM API Connect.\n\n\nPublic API is exposed via IBM API Connect\n\n\n“How to get the service running” -documentation\nPreferably the service would use Docker or Vagrant to run local environment.\nThis makes it easier to kickstart the development for new developers or\nmaintainers joining the project.\n\n\nSee also Service building tips for additional information\nhow to build services."
  },
  "index.html#(todo)-implement-authentication-with-openid-connect": {
    "title": "¶ (TODO) Implement authentication with OpenID Connect",
    "pagetitle": "Kesko HTTP Service Design",
    "slug": "index.html#(todo)-implement-authentication-with-openid-connect",
    "body": "https://www.ibm.com/support/knowledgecenter/SSWHYP_4.0.0/com.ibm.apimgmt.apionprem.doc/tutorial_apionprem_security_OAuth.html"
  },
  "index.html#require-versioning-headers": {
    "title": "¶ Require Versioning Headers",
    "pagetitle": "Kesko HTTP Service Design",
    "slug": "index.html#require-versioning-headers",
    "body": "Versioning and the transition between versions can be one of the more\nchallenging aspects of designing and operating an API. As such, it is best to\nstart with some mechanisms in place to mitigate this from the start.\nTo prevent surprise, breaking changes to users, it is best to require a version\nbe specified with all requests. Default versions should be avoided as they are\nvery difficult, at best, to change in the future.\nIt is best to provide version specification in the headers, with other\nmetadata, using the Accept header with a custom content type, e.g.:\nAccept: application/json; version=3\n\nSee Zalando versioning guidelines\nfor more."
  },
  "index.html#(todo)-when-and-how-to-bump-api-version": {
    "title": "¶ (TODO) When and how to bump API version",
    "pagetitle": "Kesko HTTP Service Design",
    "slug": "index.html#(todo)-when-and-how-to-bump-api-version",
    "body": "Follow Zalando versioning guidelines."
  },
  "index.html#require-https": {
    "title": "¶ Require HTTPS",
    "pagetitle": "Kesko HTTP Service Design",
    "slug": "index.html#require-https",
    "body": "Require secure connections with TLS to access the API, without exception.\nIt’s not worth trying to figure out or explain when it is OK to use TLS\nand when it’s not. Just require TLS for everything.\nIdeally, simply reject any non-TLS requests by not responding to requests for\nhttp or port 80 to avoid any insecure data exchange. In environments where this\nis not possible, respond with 403 Forbidden.\nRedirects are discouraged since they allow sloppy/bad client behaviour without\nproviding any clear gain.  Clients that rely on redirects double up on\nserver traffic and render TLS useless since sensitive data will already\nhave been exposed during the first call."
  },
  "index.html#use-swagger-2.0-to-describe-apis": {
    "title": "¶ Use Swagger 2.0 to describe APIs",
    "pagetitle": "Kesko HTTP Service Design",
    "slug": "index.html#use-swagger-2.0-to-describe-apis",
    "body": "Your APIs should be described as Swagger 2.0 YAML format. This shouldn’t be\na manually maintained. It should be generated from the service’s\nHTTP endpoint code.\n\nDon’t maintain API endpoints, parameters and their descriptions in multiple places.\nThey will go out of sync.\n"
  },
  "index.html#provide-human-readable-documentation-via-api-connect": {
    "title": "¶ Provide human-readable documentation via API Connect",
    "pagetitle": "Kesko HTTP Service Design",
    "slug": "index.html#provide-human-readable-documentation-via-api-connect",
    "body": "In addition to endpoint details, provide an API overview with\ninformation about:\n\n\nAPI stability and versioning, including how to select the desired API\nversion.\n\n\nCommon request and response headers.\n\n\nError serialization format.\n\n\nExamples of using the API with clients in different languages.\nAPI Connect does this when correct Swagger examples are specified.\n\n"
  },
  "index.html#accept-serialized-json-in-request-bodies": {
    "title": "¶ Accept serialized JSON in request bodies",
    "pagetitle": "Kesko HTTP Service Design",
    "slug": "index.html#accept-serialized-json-in-request-bodies",
    "body": "Accept serialized JSON on PUT/PATCH/POST request bodies, either\ninstead of or in addition to form-encoded data. This creates symmetry\nwith JSON-serialized response bodies, e.g.:\n$ curl -X POST https://service.com/apps \\\n    -H \"Content-Type: application/json\" \\\n    -d '{\"name\": \"demoapp\"}'\n\n{\n  \"id\": \"01234567-89ab-cdef-0123-456789abcdef\",\n  \"name\": \"demoapp\",\n  \"owner\": {\n    \"email\": \"username@example.com\",\n    \"id\": \"01234567-89ab-cdef-0123-456789abcdef\"\n  },\n  ...\n}\n"
  },
  "index.html#use-consistent-http-methods": {
    "title": "¶ Use consistent HTTP methods",
    "pagetitle": "Kesko HTTP Service Design",
    "slug": "index.html#use-consistent-http-methods",
    "body": "\n\n\nMethod\nDescription\n\n\n\n\nHEAD\nCan be issued against any resource to get just the HTTP header info.\n\n\nGET\nGet one or multiple resources.\n\n\nPOST\nCreate a new resource. Id of the resource is unknown before request.\n\n\nPUT\nFully replace an existing resource. Id of the resource is known before request. Note: You must send the full object on each PUT request.\n\n\nPATCH\nAdd or modify attributes for an existing resource.\n\n\nDELETE\nDelete an existing resources.\n\n\n\nGood examples:\n\nGET /api/products Get paginated array of products.\nGET /api/products/:id Get product by id.\nDELETE /api/products/:id Delete product by id.\nPOST /api/products Create a new product.\nPUT /api/products/:id Replace a products.\nPATCH /api/products/:id Add or modify attributes for a products.\nPUT /api/servers/:id/actions/hibernate Special “hibernate” action for a virtual machine.\n"
  },
  "index.html#special-action-endpoints": {
    "title": "¶ Special action endpoints",
    "pagetitle": "Kesko HTTP Service Design",
    "slug": "index.html#special-action-endpoints",
    "body": "Prefer endpoint layouts that don’t need any special actions for\nindividual resources. In cases where special actions are needed, place\nthem under a standard actions prefix, to clearly delineate them:\n/resources/:resource/actions/:action\n\ne.g.\n\n/products/actions/search\n/machines/1/actions/shutdown\n\nUse POST or PUT method for actions."
  },
  "index.html#follow-naming-conventions": {
    "title": "¶ Follow naming conventions",
    "pagetitle": "Kesko HTTP Service Design",
    "slug": "index.html#follow-naming-conventions",
    "body": "When each API follows the same rules, using the Kesko API ecosystem becomes\nmuch easier as you can trust to certain conventions.\nIf some conventions are not documented, always follow existing conventions.\nWhen introducing a new convention, there should be a plan how it will\nbe taken into use in all services.\n\nChanging API conventions across\nmultiple services takes time, so choose wisely.\n"
  },
  "index.html#use-json-naming-conventions": {
    "title": "¶ Use JSON naming conventions",
    "pagetitle": "Kesko HTTP Service Design",
    "slug": "index.html#use-json-naming-conventions",
    "body": "Use camelcased attribute names, plural array keys and correct JSON types for data. You may use strings\nfor money to make sure the API user acknowledges that using float values is dangerous.\nExample of good JSON naming conventions:\n{\n  \"id\": \"123e4567-e89b-12d3-a456-426655440000\",\n  \"name\": \"Test Name\",\n  \"plussaCards\": [\n    {\n      \"number\": \"0123123191999\",\n      \"owner\": {\n        \"_link\": \"https://keskoapi.com/api/users/123e4567-e89b-12d3-a456-426655440003\",\n        \"id\": \"123e4567-e89b-12d3-a456-426655440003\"\n      }\n    },\n    {\n      \"number\": \"0123123191998\",\n      \"owner\": {\n        \"_link\": \"https://keskoapi.com/api/users/123e4567-e89b-12d3-a456-426655440003\",\n        \"id\": \"123e4567-e89b-12d3-a456-426655440003\"\n      }\n    }\n  ],\n  \"birthYear\": 1991\n}\n"
  },
  "index.html#downcase-and-dash-separated-paths": {
    "title": "¶ Downcase and dash-separated paths",
    "pagetitle": "Kesko HTTP Service Design",
    "slug": "index.html#downcase-and-dash-separated-paths",
    "body": "Use downcased and dash-separated path names, for alignment with\nhostnames, e.g:\nservice-api.com/users\nservice-api.com/app-setups\n"
  },
  "index.html#camelcase-query-parameters": {
    "title": "¶ Camelcase query parameters",
    "pagetitle": "Kesko HTTP Service Design",
    "slug": "index.html#camelcase-query-parameters",
    "body": "Use camelcase in query parameter names:\n?isAdmin=true\n?hasComment=false&minRating=1.2\n"
  },
  "index.html#use-consistent-query-parameter-types": {
    "title": "¶ Use consistent query parameter types",
    "pagetitle": "Kesko HTTP Service Design",
    "slug": "index.html#use-consistent-query-parameter-types",
    "body": "\n\n\nType\nGood examples\nBad examples\nNote\n\n\n\n\nBooleans\n?a=true, ?a=false\n?a=1, ?a=False\n\n\n\nArrays\n?id=1&id=2\n?ids=1,2, ?ids=1&ids=2\nUse singular in parameter name\n\n\n\nIf your API requests are complex and need a lot of query parameters, consider\nmoving all parameters to a configurable body request JSON object similar to\nElasticsearch queries."
  },
  "index.html#minimize-path-nesting": {
    "title": "¶ Minimize path nesting",
    "pagetitle": "Kesko HTTP Service Design",
    "slug": "index.html#minimize-path-nesting",
    "body": "In data models with nested parent/child resource relationships, paths\nmay become deeply nested, e.g.:\n/stores/:storeId/assortments/:assortmentId/products/:productId\n\nLimit nesting depth by preferring to locate resources at the root\npath. Use nesting to indicate scoped collections. For example, for the\ncase above where a product belongs to an assortment belongs to a store:\n/stores/:storeId\n/stores/:storeId/assortments\n/assortments/:assortmentId\n/assortments/:assortmentId/products\n/products/:productId\n\nIn other words, have only one level of parent/child relationship depth in one path."
  },
  "index.html#resource-names": {
    "title": "¶ Resource names",
    "pagetitle": "Kesko HTTP Service Design",
    "slug": "index.html#resource-names",
    "body": "Use the plural version of a resource name unless the resource in question is a\nsingleton within the system (for example, the overall status of the system might\nbe /status). This keeps it consistent in the way you refer to particular resources."
  },
  "index.html#respond-structured-and-consistent-errors": {
    "title": "¶ Respond structured & consistent errors",
    "pagetitle": "Kesko HTTP Service Design",
    "slug": "index.html#respond-structured-and-consistent-errors",
    "body": "Generate consistent, structured response bodies on errors. Include a\nhuman-readable error message.\nHTTP/1.1 400 Bad Request\n\n{\n  \"statusCode\": 400,\n  \"error\": \"Bad Request\",\n  \"message\": \"child \\\"weight\\\" fails because [\\\"weight\\\" is required]\",\n  \"validation\": {\n      \"source\": \"payload\",\n      \"keys\": [\n          \"weight\"\n      ]\n  }\n}\n\nUse HapiJS Boom error payload format."
  },
  "index.html#return-appropriate-status-codes": {
    "title": "¶ Return appropriate status codes",
    "pagetitle": "Kesko HTTP Service Design",
    "slug": "index.html#return-appropriate-status-codes",
    "body": "Return appropriate HTTP status codes with each response. Successful\nresponses should be coded according to this guide:\n\n200: Request succeeded for a GET, POST, DELETE, or PATCH call that\ncompleted synchronously, or a PUT call that synchronously updated an\nexisting resource\n201: Request succeeded for a POST, or PUT call that synchronously\ncreated a new resource. It is also best practice to provide a 'Location’\nheader pointing to the newly created resource. This is particularly useful\nin the POST context as the new resource will have a different URL than the\noriginal request.\n202: Request accepted for a POST, PUT, DELETE, or PATCH call that\nwill be processed asynchronously. E.g. if your task is processed in the background with a worker.\n206: Request succeeded on GET, but only a partial response\nreturned: see above on ranges\n\nPay attention to the use of authentication and authorization error codes:\n\n401 Unauthorized: Request failed because user is not authenticated. E.g. token is not valid.\n403 Forbidden: Request failed because user does not have authorization to access a specific resource. E.g. the given token is not allowed to access the resource.\n\nReturn suitable codes to provide additional information when there are errors:\n\n400 Bad Request: Request was incorrectly formed. E.g. invalid json or missing required attributes.\n422 Unprocessable Entity: Your request was correctly formed, but contained invalid parameters. E.g. endDate is before startDate.\n429 Too Many Requests: You have been rate-limited, retry later.\n500 Internal Server Error: Something went wrong on the server, check status site and/or report the issue.\n\nRefer to the HTTP response code spec\nfor guidance on status codes for user error and server error cases."
  },
  "index.html#use-utc-times-formatted-in-iso8601": {
    "title": "¶ Use UTC times formatted in ISO8601",
    "pagetitle": "Kesko HTTP Service Design",
    "slug": "index.html#use-utc-times-formatted-in-iso8601",
    "body": "Accept and return times in UTC only. Render times in ISO8601 format,\ne.g.:\n\"finishedAt\": \"2012-01-01T12:00:00Z\"\n\nYou may have milliseconds in the timestamp too."
  },
  "index.html#provide-resource-(uu)ids": {
    "title": "¶ Provide resource (UU)IDs",
    "pagetitle": "Kesko HTTP Service Design",
    "slug": "index.html#provide-resource-(uu)ids",
    "body": "Use existing globally unique IDs when possible. E.g. use EAN codes for products\nwhen possible to avoid creating yet another ID. You may use different IDs internally\nbut public API should only expose one unique ID for a resource. This one ID should be\nused in resource objects, url paths etc.\n\nThink carefully before exposing multiple IDs for resources such as EAN and UUID.\n\nGive each resource an id attribute by default. Use UUIDs unless you\nhave a very good reason not to. Don’t use IDs that won’t be globally\nunique across instances of the service or other resources in the\nservice, especially auto-incrementing IDs.\nRender UUIDs in downcased 8-4-4-4-12 format, e.g.:\n\"id\": \"01234567-89ab-cdef-0123-456789abcdef\"\n"
  },
  "index.html#services-should": {
    "title": "¶ Services should",
    "pagetitle": "Kesko HTTP Service Design",
    "slug": "index.html#services-should",
    "body": ""
  },
  "index.html#separate-concerns": {
    "title": "¶ Separate Concerns",
    "pagetitle": "Kesko HTTP Service Design",
    "slug": "index.html#separate-concerns",
    "body": "Keep things simple while designing by separating the concerns between the\ndifferent parts of the request and response cycle. Keeping simple rules here\nallows for greater focus on larger and harder problems.\nRequests and responses will be made to address a particular resource or\ncollection. Use the path to indicate identity, the body to transfer the\ncontents and headers to communicate metadata. Query params may be used as a\nmeans to pass header information also in edge cases, but headers are preferred\nas they are more flexible and can convey more diverse information."
  },
  "index.html#use-message-queue-architecture-in-heavy-requests": {
    "title": "¶ Use Message Queue Architecture In Heavy Requests",
    "pagetitle": "Kesko HTTP Service Design",
    "slug": "index.html#use-message-queue-architecture-in-heavy-requests",
    "body": "Separate long running requests to worker processes which live independently\nfrom request-response lifecycle. For example a video resolution scaling would be\na perfect use case for worker architecture. Good rule of thumb is that if\nyour processing takes >500ms, consider using a background worker.\nBenefits:\n\n\nAlways fast HTTP responses (even though the actual processing might take time). Use a ticketing or similar system to be able to poll progress information.\n\n\nDecouple job processing from web framework. Allows you to write the worker processing with a different language since the jobs are defined in a generic job queue.\n\n\nJob queues are robust. They allow retrying, alerts from increasing job queue depth etc.\nWorker can be disposed at any time and the job is still persisted in the queue.\n\n\nScale worker processes independently from HTTP responses. Background processing might need different specs from the server, e.g. more CPU. HTTP serving is usually more IO-bound.\n\n\nRead more: https://devcenter.heroku.com/articles/background-jobs-queueing"
  },
  "index.html#divide-large-responses-across-requests-with-ranges": {
    "title": "¶ Divide Large Responses Across Requests with Ranges",
    "pagetitle": "Kesko HTTP Service Design",
    "slug": "index.html#divide-large-responses-across-requests-with-ranges",
    "body": "Large responses should be broken across multiple requests using Range headers\nto specify when more data is available and how to retrieve it. See the\nHeroku Platform API discussion of Ranges\nfor the details of request and response headers, status codes, limits,\nordering, and iteration."
  },
  "index.html#provide-request-ids-for-introspection": {
    "title": "¶ Provide Request-Ids for Introspection",
    "pagetitle": "Kesko HTTP Service Design",
    "slug": "index.html#provide-request-ids-for-introspection",
    "body": "Include a Request-Id header in each API response, populated with a\nUUID value. By logging these values on the client, server and any backing\nservices, it provides a mechanism to trace, diagnose and debug requests."
  },
  "index.html#support-http-cache-headers": {
    "title": "¶ Support HTTP cache headers",
    "pagetitle": "Kesko HTTP Service Design",
    "slug": "index.html#support-http-cache-headers",
    "body": "Recommended way is using an ETag header in all responses, identifying the specific\nversion of the returned resource. This allows users to cache resources\nand use requests with this value in the If-None-Match header to determine\nif the cache should be updated.\nYou can also use different HTTP cache headers for specific use cases but consider\nETag as the default pick."
  },
  "index.html#use-json-ld-with-schema.org-vocabulary": {
    "title": "¶ Use JSON-LD with schema.org vocabulary",
    "pagetitle": "Kesko HTTP Service Design",
    "slug": "index.html#use-json-ld-with-schema.org-vocabulary",
    "body": "Use JSON-LD format with API response data. Link other entities by referencing to an IRI which is expected to return another schema.org entity.\nSchema.org aims to create and maintain open schemas for structured data in the web. Structured data means data that is accompanied by semantics through an ontology. In other words structured data contains information about the data types and hierarchical links and relationships to other entities. JSON-LD is a format specification that extends JSON with linking capabilities. Linked data enables for example rich results in Google search.\nExample of JSON-LD with schema.org vocabulary:\n {\n    \"@context\": \"http://schema.org\",\n    \"@type\": \"HardwareStore\",\n    \"branchCode\": \"PK035-K-rauta-Lielahti\",\n    \"name\": \"K-Rauta Lielahti\",\n    \"telephone\": \"010 538 0300\",\n    \"email\": \"lielahti@k-rauta.fi\",\n    \"address\": {\n      \"@type\": \"PostalAddress\",\n      \"streetAddress\": \"Turvesuonkatu 10\",\n      \"addressLocality\": \"Tampere\",\n      \"postalCode\": \"33400\",\n      \"addressCountry\": \"FI\"\n    },\n    \"hasOfferCatalog\": {\n        \"@type\": \"OfferCatalog\",\n        \"name\": \"Products\",\n        \"url\": \"https://keskoapi.com/api/products/PK035-K-rauta-Lielahti\"\n    }\n  }\n\nRead more:\n\nhttps://schema.org/\nhttp://json-ld.org/\n"
  },
  "index.html#gzip-and-keep-json-minified-in-all-responses": {
    "title": "¶ GZip and keep JSON minified in all responses",
    "pagetitle": "Kesko HTTP Service Design",
    "slug": "index.html#gzip-and-keep-json-minified-in-all-responses",
    "body": "Extra whitespace adds needless response size to requests, and many\nclients for human consumption will automatically “prettify” JSON\noutput. It is best to keep JSON responses minified e.g.:\n{\"beta\":false,\"email\":\"alice@heroku.com\",\"id\":\"01234567-89ab-cdef-0123-456789abcdef\",\"lastLogin\":\"2012-01-01T12:00:00Z\",\"createdAt\":\"2012-01-01T12:00:00Z\",\"updatedAt\":\"2012-01-01T12:00:00Z\"}\n\nInstead of e.g.:\n{\n  \"beta\": false,\n  \"email\": \"alice@heroku.com\",\n  \"id\": \"01234567-89ab-cdef-0123-456789abcdef\",\n  \"lastLogin\": \"2012-01-01T12:00:00Z\",\n  \"createdAt\": \"2012-01-01T12:00:00Z\",\n  \"updatedAt\": \"2012-01-01T12:00:00Z\"\n}\n\nYou should also compress the API responses with GZip if client supports it."
  },
  "index.html#provide-full-resources-where-available": {
    "title": "¶ Provide full resources where available",
    "pagetitle": "Kesko HTTP Service Design",
    "slug": "index.html#provide-full-resources-where-available",
    "body": "Provide the full resource representation (i.e. the object with all\nattributes) whenever possible in the response. Always provide the full\nresource on 200 and 201 responses, including PUT/PATCH and DELETE\nrequests, e.g.:\n$ curl -X DELETE \\\n  https://service.com/apps/1f9b/domains/0fd4\n\nHTTP/1.1 200 OK\nContent-Type: application/json;charset=utf-8\n...\n{\n  \"createdAt\": \"2012-01-01T12:00:00Z\",\n  \"hostname\": \"subdomain.example.com\",\n  \"id\": \"01234567-89ab-cdef-0123-456789abcdef\",\n  \"updatedAt\": \"2012-01-01T12:00:00Z\"\n}\n\n202 responses will not include the full resource representation,\ne.g.:\n$ curl -X DELETE \\\n  https://service.com/apps/1f9b/dynos/05bd\n\nHTTP/1.1 202 Accepted\nContent-Type: application/json;charset=utf-8\n...\n{}\n"
  },
  "index.html#provide-standard-timestamps": {
    "title": "¶ Provide standard timestamps",
    "pagetitle": "Kesko HTTP Service Design",
    "slug": "index.html#provide-standard-timestamps",
    "body": "Provide createdAt and updatedAt timestamps for resources by default,\ne.g:\n{\n  // ...\n  \"createdAt\": \"2012-01-01T12:00:00Z\",\n  \"updatedAt\": \"2012-01-01T13:00:00Z\",\n  // ...\n}\n\nThese timestamps may not make sense for some resources, in which case\nthey can be omitted."
  },
  "index.html#plan-stability-and-versioning": {
    "title": "¶ Plan stability and versioning",
    "pagetitle": "Kesko HTTP Service Design",
    "slug": "index.html#plan-stability-and-versioning",
    "body": "Plan and ideally describe the stability of your API or its various endpoints according to\nits maturity and stability, e.g. with prototype/development/production\nflags.\nSee the Heroku API compatibility policy\nfor a possible stability and change management approach.\nOnce your API is declared production-ready and stable, do not make\nbackwards incompatible changes within that API version. If you need to\nmake backwards-incompatible changes, create a new API with an\nincremented version number."
  },
  "index.html#(todo)-use-_link-for-foreign-key-relations": {
    "title": "¶ (TODO) Use _link for foreign key relations",
    "pagetitle": "Kesko HTTP Service Design",
    "slug": "index.html#(todo)-use-_link-for-foreign-key-relations",
    "body": "Serialize foreign key references with a nested object, e.g.:\n{\n  \"name\": \"service-production\",\n  \"owner\": {\n    \"_link\": \"https://keskoapi.com/api/users/01234567-89ab-cdef-0123-456789abcdef\",\n    \"id\": \"01234567-89ab-cdef-0123-456789abcdef\"\n  },\n  // ...\n}\n\nInstead of e.g.:\n{\n  \"name\": \"service-production\",\n  \"ownerId\": \"01234567-89ab-cdef-0123-456789abcdef\",\n  // ...\n}\n\nIf needed, this approach makes it possible to inline more information about the\nrelated resource without having to change the structure of the response\nor introduce more top-level response fields, e.g.:\n{\n  \"name\": \"service-production\",\n  \"owner\": {\n    \"id\": \"5d8201b0...\",\n    \"name\": \"Alice\",\n    \"email\": \"alice@heroku.com\"\n  },\n  // ...\n}\n\n\nHowever prefer linking to the original data instead of inlining data.\n"
  },
  "index.html#service-building-guidelines": {
    "title": "¶ Service building guidelines",
    "pagetitle": "Kesko HTTP Service Design",
    "slug": "index.html#service-building-guidelines",
    "body": "\nThe purpose of this guide is to focus on the API design details instead\nof the whole architecture, but going through the underlying architecture principles\nhelps to understand the whole picture.\n\nMost of the backend services are built with microservice architecture. The architecture\nis used to gain certain benefits. It’s not a silver bullet\nbut has been a good fit for the domain.\nGood resources\n\nhttps://medium.com/wso2-insight/guidelines-for-designing-microservices-71ee1997776c#.d3wax578u\nhttps://www.nginx.com/blog/microservices-at-netflix-architectural-best-practices/\nhttp://highscalability.com/blog/2014/4/8/microservices-not-a-free-lunch.html\n\nThe following rules should apply for the services to benefit of the architecture:"
  },
  "index.html#service-has-a-single-responsibility": {
    "title": "¶ Service has a single responsibility",
    "pagetitle": "Kesko HTTP Service Design",
    "slug": "index.html#service-has-a-single-responsibility",
    "body": "Align them with the business capabilities. By focusing to a single responsibility,\ntechnology choices can be picked to suit the domain best. For example you could\nmodel graph heavy data with a graph-database etc.\nIf you are unsure about the splitting, it might be a better to create a broader\nservice first, and split later. This way you don’t end up with unnecesssary\noperational overhead."
  },
  "index.html#services-are-independent": {
    "title": "¶ Services are independent",
    "pagetitle": "Kesko HTTP Service Design",
    "slug": "index.html#services-are-independent",
    "body": "For example product service can be deployed independently from product order status service.\nWhen product order status service is down or has broken, product service should not be\naffected by the incident.\nServices should also have independent attached resources such as Redis, Postgres etc.\n\nExample smell of bad design: deploying a service requires updating another service\nat the same time. Correct versioning fixes this.\n"
  },
  "index.html#design-for-failures": {
    "title": "¶ Design for failures",
    "pagetitle": "Kesko HTTP Service Design",
    "slug": "index.html#design-for-failures",
    "body": "When accessing data of other microservices, you should use their normal HTTP APIs.\nTreat them as you would e.g. when integrating to GitHub API.\nAnd as said before, assume it to be down at any time.\nEach microservice should be horizontally scalable to avoid single point of failures."
  },
  "index.html#delegate-common-service-needs-to-an-api-gateway": {
    "title": "¶ Delegate common service needs to an API gateway",
    "pagetitle": "Kesko HTTP Service Design",
    "slug": "index.html#delegate-common-service-needs-to-an-api-gateway",
    "body": "For example:\n\nRate limiting\nMonitoring\nAPI user authentication management\ne.g. giving access to the whole API for a 3rd party developer.\nDifferent than API GW <-> Microservice authentication\n"
  },
  "index.html#services-should-have-multiple-environments": {
    "title": "¶ Services should have multiple environments",
    "pagetitle": "Kesko HTTP Service Design",
    "slug": "index.html#services-should-have-multiple-environments",
    "body": "Environments help in rapid development. This is a good, in practice tested, set of\nenvironments you should have. At minimum, have qa and prod environments.\n\n\n\nEnvironment\nPurpose\n\n\n\n\ndev\nExperimental. Sharing new features / fixes to other developers or customer. May break at any time, but should be kept as a working environment.\n\n\nqa\nShould be as close as prod as possible. All deployments must be tested in this environment before deployment to prod.\n\n\nprod\nThe real deal. Used to serve end users. Response times should ideally be <100ms\n\n\n\nAll these environments should be as similar to each other as possible, e.g. have\nthe same external dependencies(Postgres 9.4)."
  }
});
window.__lunrindex=({"version":"0.5.12","fields":[{"name":"title","boost":10},{"name":"pagetitle","boost":3},{"name":"body","boost":1}],"ref":"slug","documentStore":{"store":{"index.html":["advic","api","contradictori","design","docpress","document","even","extract","fork","format","gitbook","guid","heroku","http","https://github.com/interagent/http","instead","kesko","origin","platform","progress","servic","stabil","transform","us","work"],"index.html#goal-of-the-document":["api","app","avoid","bikeshed","busi","commun","consist","convent","creat","design","develop","document","ensur","focus","follow","goal","good","guid","here","http","hundr","individu","kesko","logic","look","more","necessarili","only/id","process","same","servic","speed","support","ten","tri","trust","up","user","way","well","we’r"],"index.html#services-must":["design","http","kesko","servic"],"index.html#provide-certain-mandatory-artifactsactions":["2.0","addit","alway","api","artifacts/act","build","certain","connect","creat","design","develop","docker","document","easier","environ","expos","http","ibm","inform","join","kesko","kickstart","latest","local","maintain","make","mandatori","new","prefer","project","provid","public","requir","run","see","servic","swagger","tip","upload","us","vagrant","via","yaml"],"index.html#(todo)-implement-authentication-with-openid-connect":["authent","connect","design","http","https://www.ibm.com/support/knowledgecenter/sswhyp_4.0.0/com.ibm.apimgmt.apionprem.doc/tutorial_apionprem_security_oauth.html","implement","kesko","openid","servic","todo"],"index.html#require-versioning-headers":["accept","api","application/json","aspect","avoid","best","between","break","challeng","chang","content","custom","default","design","difficult","e.g","futur","guidelin","header","http","kesko","mechan","metadata","mitig","more","on","oper","place","prevent","provid","request","requir","see","servic","specif","specifi","start","such","surpris","transit","type","us","user","veri","version","version=3","zalando"],"index.html#(todo)-when-and-how-to-bump-api-version":["api","bump","design","follow","guidelin","http","kesko","servic","todo","version","zalando"],"index.html#require-https":["403","80","access","allow","alreadi","api","avoid","behaviour","call","clear","client","connect","data","design","discourag","doubl","dure","environ","everyth","except","exchang","explain","expos","figur","first","forbidden","gain","http","ideal","insecur","it’","kesko","non","ok","out","port","possibl","provid","redirect","reject","reli","render","request","requir","respond","secur","sensit","server","servic","simpli","sloppy/bad","tl","traffic","tri","up","us","useless","without","worth"],"index.html#use-swagger-2.0-to-describe-apis":["2.0","api","code","describ","descript","design","don’t","endpoint","format","gener","go","http","kesko","maintain","manual","multipl","out","paramet","place","servic","service’","shouldn’t","swagger","sync","us","yaml"],"index.html#provide-human-readable-documentation-via-api-connect":["addit","api","client","common","connect","correct","design","desir","detail","differ","document","endpoint","error","exampl","format","header","http","human","includ","inform","kesko","languag","overview","provid","readabl","request","respons","select","serial","servic","specifi","stabil","swagger","us","version","via"],"index.html#accept-serialized-json-in-request-bodies":["0123","01234567","456789abcdef","89ab","accept","addit","application/json","bodi","cdef","content","creat","curl","d","data","demoapp","design","e.g","email","encod","form","h","http","https://service.com/app","id","instead","json","kesko","name","owner","post","put/patch/post","request","respons","serial","servic","symmetri","type","username@example.com","x"],"index.html#use-consistent-http-methods":["action","add","against","api/product","api/products/:id","api/servers/:id/actions/hibern","array","attribut","befor","consist","creat","delet","descript","design","each","exampl","exist","full","fulli","good","head","header","hibern","http","id","info","issu","kesko","known","machin","method","modifi","multipl","new","note","object","on","pagin","patch","post","product","put","replac","request","resourc","send","servic","special","unknown","us","virtual"],"index.html#special-action-endpoints":["action","case","clearli","delin","design","don’t","e.g","endpoint","http","individu","kesko","layout","machines/1/actions/shutdown","method","need","place","post","prefer","prefix","products/actions/search","put","resourc","resources/:resource/actions/:act","servic","special","standard","under","us"],"index.html#follow-naming-conventions":["alway","api","becom","certain","chang","choos","convent","design","document","each","easier","ecosystem","exist","follow","http","introduc","kesko","much","multipl","name","new","plan","rule","same","servic","take","taken","time","trust","us","wise"],"index.html#use-json-naming-conventions":["0123123191998","0123123191999","123e4567","12d3","1991","426655440000","426655440003","_link","a456","acknowledg","api","array","attribut","birthyear","camelcas","convent","correct","danger","data","design","e89b","exampl","float","good","http","https://keskoapi.com/api/users/123e4567","id","json","kesko","key","make","money","name","number","owner","plural","plussacard","servic","string","sure","test","type","us","user","valu"],"index.html#downcase-and-dash-separated-paths":["align","api.com/app","api.com/us","dash","design","downcas","e.g","hostnam","http","kesko","name","path","separ","servic","setup","us"],"index.html#camelcase-query-parameters":["camelcas","design","hascomment=false&minrating=1.2","http","isadmin=tru","kesko","name","paramet","queri","servic","us"],"index.html#use-consistent-query-parameter-types":["a=1","a=fals","a=tru","api","array","bad","bodi","boolean","complex","configur","consid","consist","design","elasticsearch","exampl","good","http","id=1&id=2","ids=1&ids=2","ids=1,2","json","kesko","lot","move","name","need","note","object","paramet","queri","request","servic","similar","singular","type","us"],"index.html#minimize-path-nesting":["abov","assort","assortments/:assortmentid","assortments/:assortmentid/product","becom","belong","case","collect","data","deepli","depth","design","e.g","exampl","http","indic","kesko","level","limit","locat","minim","model","nest","on","parent/child","path","prefer","product","products/:productid","relationship","resourc","root","scope","servic","store","stores/:storeid","stores/:storeid/assort","stores/:storeid/assortments/:assortmentid/products/:productid","us","word"],"index.html#resource-names":["consist","design","exampl","http","keep","kesko","name","overal","particular","plural","question","refer","resourc","servic","singleton","statu","system","unless","us","version","way","within"],"index.html#respond-structured-and-consistent-errors":["400","bad","bodi","boom","child","consist","design","error","fail","format","gener","hapij","http","http/1.1","human","includ","kesko","key","messag","payload","readabl","request","requir","respond","respons","servic","sourc","statuscod","structur","us","valid","weight"],"index.html#return-appropriate-status-codes":["200","201","202","206","400","401","403","422","429","500","abov","accept","access","accord","addit","allow","and/or","appropri","asynchron","attent","attribut","authent","author","background","bad","befor","best","call","case","check","code","complet","contain","context","correctli","creat","delet","design","differ","e.g","each","enddat","entiti","error","exist","fail","forbidden","form","given","guid","guidanc","header","http","incorrectli","inform","intern","invalid","issu","json","kesko","later","limit","locat","mani","miss","new","newli","origin","paramet","partial","particularli","patch","pay","point","post","practic","process","provid","put","rang","rate","refer","report","request","requir","resourc","respons","retri","return","see","server","servic","site","someth","spec","specif","startdat","statu","succeed","success","suitabl","synchron","task","token","unauthor","unprocess","updat","url","us","user","valid","went","worker","wrong"],"index.html#use-utc-times-formatted-in-iso8601":["01","01t12:00:00z","2012","accept","design","e.g","finishedat","format","http","iso8601","kesko","millisecond","render","return","servic","time","timestamp","us","utc"],"index.html#provide-resource-(uu)ids":["0123","01234567","12","4","456789abcdef","8","89ab","anoth","api","attribut","auto","avoid","befor","carefulli","cdef","code","creat","default","design","differ","don’t","downcas","e.g","each","ean","especi","etc","exist","expos","format","give","global","good","http","id","increment","instanc","intern","kesko","multipl","object","on","path","possibl","product","provid","public","reason","render","resourc","servic","such","think","uniqu","unless","url","us","uu)id","uuid","veri","won’t"],"index.html#services-should":["design","http","kesko","servic"],"index.html#separate-concerns":["address","allow","between","bodi","case","collect","commun","concern","content","convey","cycl","design","differ","divers","edg","flexibl","focu","greater","harder","header","here","http","ident","indic","inform","keep","kesko","larger","made","mean","metadata","more","param","part","particular","pass","path","prefer","problem","queri","request","resourc","respons","rule","separ","servic","simpl","thing","transfer","us"],"index.html#use-message-queue-architecture-in-heavy-requests":["500m","actual","alert","allow","alway","architectur","background","benefit","bound","case","consid","cpu","decoupl","defin","depth","design","differ","dispos","e.g","etc","even","exampl","fast","framework","gener","good","heavi","http","https://devcenter.heroku.com/articles/background","increas","independ","inform","io","job","kesko","languag","lifecycl","live","long","messag","more","need","perfect","persist","poll","process","progress","queue","read","request","resolut","respons","retri","robust","rule","run","scale","separ","serv","server","servic","similar","spec","still","system","take","though","thumb","ticket","time","us","usual","video","web","worker","write"],"index.html#divide-large-responses-across-requests-with-ranges":["api","avail","broken","code","data","design","detail","discuss","divid","header","heroku","http","iter","kesko","larg","limit","more","multipl","order","platform","rang","request","respons","retriev","see","servic","specifi","statu","us"],"index.html#provide-request-ids-for-introspection":["api","back","client","debug","design","diagnos","each","header","http","id","includ","introspect","kesko","log","mechan","popul","provid","request","respons","server","servic","trace","uuid","valu"],"index.html#support-http-cache-headers":["allow","cach","case","consid","default","design","determin","differ","etag","header","http","identifi","kesko","match","none","pick","recommend","request","resourc","respons","return","servic","specif","support","updat","us","user","valu","version","way"],"index.html#use-json-ld-with-schema.org-vocabulary":["010","0300","10","33400","538","accompani","address","addresscountri","addressloc","aim","anoth","api","branchcod","capabl","contain","context","creat","data","design","email","enabl","entiti","exampl","expect","extend","fi","format","googl","hardwarestor","hasoffercatalog","hierarch","http","http://json","http://schema.org","https://keskoapi.com/api/products/pk035","https://schema.org","inform","iri","json","k","kesko","ld","ld.org","lielahti","lielahti@k","link","maintain","mean","more","name","offercatalog","ontolog","open","pk035","postaladdress","postalcod","product","rauta","rauta.fi","read","referenc","relationship","respons","result","return","rich","schema","schema.org","search","semant","servic","specif","streetaddress","structur","tamper","telephon","through","turvesuonkatu","type","url","us","vocabulari","web","word"],"index.html#gzip-and-keep-json-minified-in-all-responses":["01","0123","01234567","01t12:00:00z","01t12:00:00z\",\"createdat\":\"2012","01t12:00:00z\",\"updatedat\":\"2012","2012","456789abcdef","456789abcdef\",\"lastlogin\":\"2012","89ab","add","alice@heroku.com","api","automat","best","beta","beta\":false,\"email\":\"alice@heroku.com\",\"id\":\"01234567","cdef","client","compress","consumpt","createdat","design","e.g","email","extra","fals","gzip","http","human","id","instead","json","keep","kesko","lastlogin","mani","minifi","needless","output","prettifi","request","respons","servic","size","support","updatedat","whitespac"],"index.html#provide-full-resources-where-available":["01","0123","01234567","01t12:00:00z","200","201","2012","202","456789abcdef","8","89ab","accept","alway","application/json;charset=utf","attribut","avail","cdef","content","createdat","curl","delet","design","e.g","full","hostnam","http","http/1.1","https://service.com/apps/1f9b/domains/0fd4","https://service.com/apps/1f9b/dynos/05bd","i.","id","includ","kesko","object","ok","possibl","provid","put/patch","represent","request","resourc","respons","servic","subdomain.example.com","type","updatedat","whenev","x"],"index.html#provide-standard-timestamps":["01","01t12:00:00z","01t13:00:00z","2012","case","createdat","default","design","e.g","http","kesko","make","omit","provid","resourc","sens","servic","standard","timestamp","updatedat"],"index.html#plan-stability-and-versioning":["accord","api","approach","backward","chang","compat","creat","declar","describ","design","e.g","endpoint","flag","heroku","http","ideal","incompat","increment","kesko","make","manag","matur","need","new","number","onc","plan","polici","possibl","product","prototype/development/product","readi","see","servic","stabil","stabl","variou","version","within"],"index.html#(todo)-use-_link-for-foreign-key-relations":["0123","01234567","456789abcdef","5d8201b0","89ab","_link","alic","alice@heroku.com","approach","cdef","chang","data","design","e.g","email","field","foreign","have","http","https://keskoapi.com/api/users/01234567","id","inform","inlin","instead","introduc","kesko","key","level","link","make","more","name","need","nest","object","origin","owner","ownerid","possibl","prefer","product","refer","relat","resourc","respons","serial","servic","structur","todo","top","us","without"],"index.html#service-building-guidelines":["71ee1997776c#.d3wax578u","api","appli","architectur","backend","benefit","best","build","built","bullet","certain","design","detail","domain","fit","focu","follow","free","gain","go","good","guid","guidelin","help","http","http://highscalability.com/blog/2014/4/8/microservic","https://medium.com/wso2","https://www.nginx.com/blog/microservic","insight/guidelin","instead","it’","kesko","lunch.html","microservic","netflix","pictur","practic","principl","purpos","resourc","rule","servic","silver","through","underli","understand","us","whole"],"index.html#service-has-a-single-responsibility":["align","best","better","broader","busi","capabl","choic","creat","data","databas","design","domain","don’t","end","etc","exampl","first","focus","graph","heavi","http","kesko","later","model","oper","overhead","pick","respons","servic","singl","split","suit","technolog","unnecesssari","unsur","up","way"],"index.html#services-are-independent":["affect","anoth","attach","bad","broken","correct","deploy","design","down","etc","exampl","fix","http","incid","independ","kesko","order","postgr","product","redi","requir","resourc","same","servic","smell","statu","such","time","updat","version"],"index.html#design-for-failures":["access","api","assum","avoid","befor","data","design","down","e.g","each","failur","github","horizont","http","integr","kesko","microservic","normal","point","scalabl","servic","singl","time","treat","us"],"index.html#delegate-common-service-needs-to-an-api-gateway":["3rd","access","api","authent","common","deleg","design","develop","differ","e.g","exampl","gateway","give","gw","http","kesko","limit","manag","microservic","monitor","need","parti","rate","servic","user","whole"],"index.html#services-should-have-multiple-environments":["100m","9.4","befor","break","close","custom","deal","dependencies(postgr","deploy","design","dev","develop","e.g","each","end","environ","experiment","extern","featur","fix","good","help","http","ideal","kept","kesko","minimum","multipl","new","possibl","practic","prod","purpos","qa","rapid","real","respons","same","serv","servic","set","share","similar","test","time","us","user","work"]},"length":42},"tokenStore":{"root":{"0":{"1":{"0":{"docs":{"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428}}},"2":{"3":{"1":{"2":{"3":{"1":{"9":{"1":{"9":{"9":{"8":{"docs":{"index.html#use-json-naming-conventions":{"ref":"index.html#use-json-naming-conventions","tf":0.014285714285714285}}},"9":{"docs":{"index.html#use-json-naming-conventions":{"ref":"index.html#use-json-naming-conventions","tf":0.014285714285714285}}},"docs":{}},"docs":{}},"docs":{}},"docs":{}},"docs":{}},"docs":{}},"docs":{}},"docs":{}},"4":{"5":{"6":{"7":{"docs":{"index.html#accept-serialized-json-in-request-bodies":{"ref":"index.html#accept-serialized-json-in-request-bodies","tf":0.043478260869565216},"index.html#provide-resource-(uu)ids":{"ref":"index.html#provide-resource-(uu)ids","tf":0.011494252873563218},"index.html#gzip-and-keep-json-minified-in-all-responses":{"ref":"index.html#gzip-and-keep-json-minified-in-all-responses","tf":0.016129032258064516},"index.html#provide-full-resources-where-available":{"ref":"index.html#provide-full-resources-where-available","tf":0.014925373134328358},"index.html#(todo)-use-_link-for-foreign-key-relations":{"ref":"index.html#(todo)-use-_link-for-foreign-key-relations","tf":0.027777777777777776}}},"docs":{}},"docs":{}},"docs":{}},"docs":{"index.html#accept-serialized-json-in-request-bodies":{"ref":"index.html#accept-serialized-json-in-request-bodies","tf":0.043478260869565216},"index.html#provide-resource-(uu)ids":{"ref":"index.html#provide-resource-(uu)ids","tf":0.011494252873563218},"index.html#gzip-and-keep-json-minified-in-all-responses":{"ref":"index.html#gzip-and-keep-json-minified-in-all-responses","tf":0.03225806451612903},"index.html#provide-full-resources-where-available":{"ref":"index.html#provide-full-resources-where-available","tf":0.014925373134328358},"index.html#(todo)-use-_link-for-foreign-key-relations":{"ref":"index.html#(todo)-use-_link-for-foreign-key-relations","tf":0.041666666666666664}}},"docs":{}},"docs":{"index.html#use-utc-times-formatted-in-iso8601":{"ref":"index.html#use-utc-times-formatted-in-iso8601","tf":0.06666666666666667},"index.html#gzip-and-keep-json-minified-in-all-responses":{"ref":"index.html#gzip-and-keep-json-minified-in-all-responses","tf":0.0967741935483871},"index.html#provide-full-resources-where-available":{"ref":"index.html#provide-full-resources-where-available","tf":0.029850746268656716},"index.html#provide-standard-timestamps":{"ref":"index.html#provide-standard-timestamps","tf":0.09523809523809523}},"t":{"1":{"2":{"docs":{},":":{"0":{"0":{"docs":{},":":{"0":{"0":{"docs":{},"z":{"docs":{"index.html#use-utc-times-formatted-in-iso8601":{"ref":"index.html#use-utc-times-formatted-in-iso8601","tf":0.06666666666666667},"index.html#gzip-and-keep-json-minified-in-all-responses":{"ref":"index.html#gzip-and-keep-json-minified-in-all-responses","tf":0.06451612903225806},"index.html#provide-full-resources-where-available":{"ref":"index.html#provide-full-resources-where-available","tf":0.029850746268656716},"index.html#provide-standard-timestamps":{"ref":"index.html#provide-standard-timestamps","tf":0.047619047619047616}},"\"":{"docs":{},",":{"docs":{},"\"":{"docs":{},"c":{"docs":{},"r":{"docs":{},"e":{"docs":{},"a":{"docs":{},"t":{"docs":{},"e":{"docs":{},"d":{"docs":{},"a":{"docs":{},"t":{"docs":{},"\"":{"docs":{},":":{"docs":{},"\"":{"2":{"0":{"1":{"2":{"docs":{"index.html#gzip-and-keep-json-minified-in-all-responses":{"ref":"index.html#gzip-and-keep-json-minified-in-all-responses","tf":0.016129032258064516}}},"docs":{}},"docs":{}},"docs":{}},"docs":{}}}}}}}}}}}}},"u":{"docs":{},"p":{"docs":{},"d":{"docs":{},"a":{"docs":{},"t":{"docs":{},"e":{"docs":{},"d":{"docs":{},"a":{"docs":{},"t":{"docs":{},"\"":{"docs":{},":":{"docs":{},"\"":{"2":{"0":{"1":{"2":{"docs":{"index.html#gzip-and-keep-json-minified-in-all-responses":{"ref":"index.html#gzip-and-keep-json-minified-in-all-responses","tf":0.016129032258064516}}},"docs":{}},"docs":{}},"docs":{}},"docs":{}}}}}}}}}}}}}}}}}},"docs":{}},"docs":{}}},"docs":{}},"docs":{}}},"3":{"docs":{},":":{"0":{"0":{"docs":{},":":{"0":{"0":{"docs":{},"z":{"docs":{"index.html#provide-standard-timestamps":{"ref":"index.html#provide-standard-timestamps","tf":0.047619047619047616}}}},"docs":{}},"docs":{}}},"docs":{}},"docs":{}}},"docs":{}},"docs":{}}},"3":{"0":{"0":{"docs":{"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428}}},"docs":{}},"docs":{}},"docs":{}},"1":{"0":{"0":{"docs":{},"m":{"docs":{"index.html#services-should-have-multiple-environments":{"ref":"index.html#services-should-have-multiple-environments","tf":0.017241379310344827}}}},"docs":{"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428}}},"2":{"3":{"docs":{},"e":{"4":{"5":{"6":{"7":{"docs":{"index.html#use-json-naming-conventions":{"ref":"index.html#use-json-naming-conventions","tf":0.04285714285714286}}},"docs":{}},"docs":{}},"docs":{}},"docs":{}}},"docs":{"index.html#provide-resource-(uu)ids":{"ref":"index.html#provide-resource-(uu)ids","tf":0.011494252873563218}},"d":{"3":{"docs":{"index.html#use-json-naming-conventions":{"ref":"index.html#use-json-naming-conventions","tf":0.07142857142857142}}},"docs":{}}},"9":{"9":{"1":{"docs":{"index.html#use-json-naming-conventions":{"ref":"index.html#use-json-naming-conventions","tf":0.014285714285714285}}},"docs":{}},"docs":{}},"docs":{}},"2":{"0":{"0":{"docs":{"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294},"index.html#provide-full-resources-where-available":{"ref":"index.html#provide-full-resources-where-available","tf":0.029850746268656716}}},"1":{"2":{"docs":{"index.html#use-utc-times-formatted-in-iso8601":{"ref":"index.html#use-utc-times-formatted-in-iso8601","tf":0.06666666666666667},"index.html#gzip-and-keep-json-minified-in-all-responses":{"ref":"index.html#gzip-and-keep-json-minified-in-all-responses","tf":0.04838709677419355},"index.html#provide-full-resources-where-available":{"ref":"index.html#provide-full-resources-where-available","tf":0.029850746268656716},"index.html#provide-standard-timestamps":{"ref":"index.html#provide-standard-timestamps","tf":0.09523809523809523}}},"docs":{"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294},"index.html#provide-full-resources-where-available":{"ref":"index.html#provide-full-resources-where-available","tf":0.014925373134328358}}},"2":{"docs":{"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294},"index.html#provide-full-resources-where-available":{"ref":"index.html#provide-full-resources-where-available","tf":0.029850746268656716}}},"6":{"docs":{"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294}}},"docs":{}},"docs":{},".":{"0":{"docs":{"index.html#provide-certain-mandatory-artifactsactions":{"ref":"index.html#provide-certain-mandatory-artifactsactions","tf":0.018867924528301886},"index.html#use-swagger-2.0-to-describe-apis":{"ref":"index.html#use-swagger-2.0-to-describe-apis","tf":2.04}}},"docs":{}}},"3":{"3":{"4":{"0":{"0":{"docs":{"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428}}},"docs":{}},"docs":{}},"docs":{}},"docs":{},"r":{"docs":{},"d":{"docs":{"index.html#delegate-common-service-needs-to-an-api-gateway":{"ref":"index.html#delegate-common-service-needs-to-an-api-gateway","tf":0.047619047619047616}}}}},"4":{"0":{"0":{"docs":{"index.html#respond-structured-and-consistent-errors":{"ref":"index.html#respond-structured-and-consistent-errors","tf":0.05405405405405406},"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294}}},"1":{"docs":{"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294}}},"3":{"docs":{"index.html#require-https":{"ref":"index.html#require-https","tf":0.014705882352941176},"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294}}},"docs":{}},"2":{"2":{"docs":{"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294}}},"6":{"6":{"5":{"5":{"4":{"4":{"0":{"0":{"0":{"0":{"docs":{"index.html#use-json-naming-conventions":{"ref":"index.html#use-json-naming-conventions","tf":0.014285714285714285}}},"3":{"docs":{"index.html#use-json-naming-conventions":{"ref":"index.html#use-json-naming-conventions","tf":0.05714285714285714}}},"docs":{}},"docs":{}},"docs":{}},"docs":{}},"docs":{}},"docs":{}},"docs":{}},"docs":{}},"docs":{}},"9":{"docs":{"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294}}},"docs":{}},"5":{"6":{"7":{"8":{"9":{"docs":{},"a":{"docs":{},"b":{"docs":{},"c":{"docs":{},"d":{"docs":{},"e":{"docs":{},"f":{"docs":{"index.html#accept-serialized-json-in-request-bodies":{"ref":"index.html#accept-serialized-json-in-request-bodies","tf":0.043478260869565216},"index.html#provide-resource-(uu)ids":{"ref":"index.html#provide-resource-(uu)ids","tf":0.011494252873563218},"index.html#gzip-and-keep-json-minified-in-all-responses":{"ref":"index.html#gzip-and-keep-json-minified-in-all-responses","tf":0.016129032258064516},"index.html#provide-full-resources-where-available":{"ref":"index.html#provide-full-resources-where-available","tf":0.014925373134328358},"index.html#(todo)-use-_link-for-foreign-key-relations":{"ref":"index.html#(todo)-use-_link-for-foreign-key-relations","tf":0.041666666666666664}},"\"":{"docs":{},",":{"docs":{},"\"":{"docs":{},"l":{"docs":{},"a":{"docs":{},"s":{"docs":{},"t":{"docs":{},"l":{"docs":{},"o":{"docs":{},"g":{"docs":{},"i":{"docs":{},"n":{"docs":{},"\"":{"docs":{},":":{"docs":{},"\"":{"2":{"0":{"1":{"2":{"docs":{"index.html#gzip-and-keep-json-minified-in-all-responses":{"ref":"index.html#gzip-and-keep-json-minified-in-all-responses","tf":0.016129032258064516}}},"docs":{}},"docs":{}},"docs":{}},"docs":{}}}}}}}}}}}}}}}}}}}}}}},"docs":{}},"docs":{}},"docs":{}},"docs":{}},"docs":{"index.html#provide-resource-(uu)ids":{"ref":"index.html#provide-resource-(uu)ids","tf":0.034482758620689655}}},"5":{"0":{"0":{"docs":{"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294}},"m":{"docs":{"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.009259259259259259}}}},"docs":{}},"3":{"8":{"docs":{"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428}}},"docs":{}},"docs":{},"d":{"8":{"2":{"0":{"1":{"docs":{},"b":{"0":{"docs":{"index.html#(todo)-use-_link-for-foreign-key-relations":{"ref":"index.html#(todo)-use-_link-for-foreign-key-relations","tf":0.013888888888888888}}},"docs":{}}},"docs":{}},"docs":{}},"docs":{}},"docs":{}}},"7":{"1":{"docs":{},"e":{"docs":{},"e":{"1":{"9":{"9":{"7":{"7":{"7":{"6":{"docs":{},"c":{"docs":{},"#":{"docs":{},".":{"docs":{},"d":{"3":{"docs":{},"w":{"docs":{},"a":{"docs":{},"x":{"5":{"7":{"8":{"docs":{},"u":{"docs":{"index.html#service-building-guidelines":{"ref":"index.html#service-building-guidelines","tf":0.01818181818181818}}}},"docs":{}},"docs":{}},"docs":{}}}}},"docs":{}}}}}},"docs":{}},"docs":{}},"docs":{}},"docs":{}},"docs":{}},"docs":{}},"docs":{}}}},"docs":{}},"8":{"0":{"docs":{"index.html#require-https":{"ref":"index.html#require-https","tf":0.014705882352941176}}},"9":{"docs":{},"a":{"docs":{},"b":{"docs":{"index.html#accept-serialized-json-in-request-bodies":{"ref":"index.html#accept-serialized-json-in-request-bodies","tf":0.043478260869565216},"index.html#provide-resource-(uu)ids":{"ref":"index.html#provide-resource-(uu)ids","tf":0.011494252873563218},"index.html#gzip-and-keep-json-minified-in-all-responses":{"ref":"index.html#gzip-and-keep-json-minified-in-all-responses","tf":0.03225806451612903},"index.html#provide-full-resources-where-available":{"ref":"index.html#provide-full-resources-where-available","tf":0.014925373134328358},"index.html#(todo)-use-_link-for-foreign-key-relations":{"ref":"index.html#(todo)-use-_link-for-foreign-key-relations","tf":0.041666666666666664}}}}},"docs":{"index.html#provide-resource-(uu)ids":{"ref":"index.html#provide-resource-(uu)ids","tf":0.011494252873563218},"index.html#provide-full-resources-where-available":{"ref":"index.html#provide-full-resources-where-available","tf":0.029850746268656716}}},"9":{"docs":{},".":{"4":{"docs":{"index.html#services-should-have-multiple-environments":{"ref":"index.html#services-should-have-multiple-environments","tf":0.017241379310344827}}},"docs":{}}},"docs":{},"a":{"4":{"5":{"6":{"docs":{"index.html#use-json-naming-conventions":{"ref":"index.html#use-json-naming-conventions","tf":0.07142857142857142}}},"docs":{}},"docs":{}},"docs":{},"d":{"docs":{},"v":{"docs":{},"i":{"docs":{},"c":{"docs":{"index.html":{"ref":"index.html","tf":0.04}}}}},"d":{"docs":{"index.html#use-consistent-http-methods":{"ref":"index.html#use-consistent-http-methods","tf":0.023809523809523808},"index.html#gzip-and-keep-json-minified-in-all-responses":{"ref":"index.html#gzip-and-keep-json-minified-in-all-responses","tf":0.016129032258064516}},"i":{"docs":{},"t":{"docs":{"index.html#provide-certain-mandatory-artifactsactions":{"ref":"index.html#provide-certain-mandatory-artifactsactions","tf":0.018867924528301886},"index.html#provide-human-readable-documentation-via-api-connect":{"ref":"index.html#provide-human-readable-documentation-via-api-connect","tf":0.029411764705882353},"index.html#accept-serialized-json-in-request-bodies":{"ref":"index.html#accept-serialized-json-in-request-bodies","tf":0.021739130434782608},"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294}}}},"r":{"docs":{},"e":{"docs":{},"s":{"docs":{},"s":{"docs":{"index.html#separate-concerns":{"ref":"index.html#separate-concerns","tf":0.017857142857142856},"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428}},"c":{"docs":{},"o":{"docs":{},"u":{"docs":{},"n":{"docs":{},"t":{"docs":{},"r":{"docs":{},"i":{"docs":{"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428}}}}}}}}},"l":{"docs":{},"o":{"docs":{},"c":{"docs":{"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428}}}}}}}}}}},"p":{"docs":{},"i":{"docs":{"index.html":{"ref":"index.html","tf":0.08},"index.html#goal-of-the-document":{"ref":"index.html#goal-of-the-document","tf":0.10204081632653061},"index.html#provide-certain-mandatory-artifactsactions":{"ref":"index.html#provide-certain-mandatory-artifactsactions","tf":0.07547169811320754},"index.html#require-versioning-headers":{"ref":"index.html#require-versioning-headers","tf":0.017543859649122806},"index.html#(todo)-when-and-how-to-bump-api-version":{"ref":"index.html#(todo)-when-and-how-to-bump-api-version","tf":2.5},"index.html#require-https":{"ref":"index.html#require-https","tf":0.014705882352941176},"index.html#use-swagger-2.0-to-describe-apis":{"ref":"index.html#use-swagger-2.0-to-describe-apis","tf":2.08},"index.html#provide-human-readable-documentation-via-api-connect":{"ref":"index.html#provide-human-readable-documentation-via-api-connect","tf":1.57563025210084},"index.html#follow-naming-conventions":{"ref":"index.html#follow-naming-conventions","tf":0.08108108108108109},"index.html#use-json-naming-conventions":{"ref":"index.html#use-json-naming-conventions","tf":0.014285714285714285},"index.html#use-consistent-query-parameter-types":{"ref":"index.html#use-consistent-query-parameter-types","tf":0.02702702702702703},"index.html#provide-resource-(uu)ids":{"ref":"index.html#provide-resource-(uu)ids","tf":0.011494252873563218},"index.html#divide-large-responses-across-requests-with-ranges":{"ref":"index.html#divide-large-responses-across-requests-with-ranges","tf":0.03571428571428571},"index.html#provide-request-ids-for-introspection":{"ref":"index.html#provide-request-ids-for-introspection","tf":0.045454545454545456},"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428},"index.html#gzip-and-keep-json-minified-in-all-responses":{"ref":"index.html#gzip-and-keep-json-minified-in-all-responses","tf":0.016129032258064516},"index.html#plan-stability-and-versioning":{"ref":"index.html#plan-stability-and-versioning","tf":0.10638297872340426},"index.html#service-building-guidelines":{"ref":"index.html#service-building-guidelines","tf":0.01818181818181818},"index.html#design-for-failures":{"ref":"index.html#design-for-failures","tf":0.08333333333333333},"index.html#delegate-common-service-needs-to-an-api-gateway":{"ref":"index.html#delegate-common-service-needs-to-an-api-gateway","tf":1.8095238095238093}},"/":{"docs":{},"p":{"docs":{},"r":{"docs":{},"o":{"docs":{},"d":{"docs":{},"u":{"docs":{},"c":{"docs":{},"t":{"docs":{"index.html#use-consistent-http-methods":{"ref":"index.html#use-consistent-http-methods","tf":0.023809523809523808}},"s":{"docs":{},"/":{"docs":{},":":{"docs":{},"i":{"docs":{},"d":{"docs":{"index.html#use-consistent-http-methods":{"ref":"index.html#use-consistent-http-methods","tf":0.047619047619047616}}}}}}}}}}}}}},"s":{"docs":{},"e":{"docs":{},"r":{"docs":{},"v":{"docs":{},"e":{"docs":{},"r":{"docs":{},"s":{"docs":{},"/":{"docs":{},":":{"docs":{},"i":{"docs":{},"d":{"docs":{},"/":{"docs":{},"a":{"docs":{},"c":{"docs":{},"t":{"docs":{},"i":{"docs":{},"o":{"docs":{},"n":{"docs":{},"s":{"docs":{},"/":{"docs":{},"h":{"docs":{},"i":{"docs":{},"b":{"docs":{},"e":{"docs":{},"r":{"docs":{},"n":{"docs":{"index.html#use-consistent-http-methods":{"ref":"index.html#use-consistent-http-methods","tf":0.011904761904761904}}}}}}}}}}}}}}}}}}}}}}}}}}}}},".":{"docs":{},"c":{"docs":{},"o":{"docs":{},"m":{"docs":{},"/":{"docs":{},"a":{"docs":{},"p":{"docs":{},"p":{"docs":{"index.html#downcase-and-dash-separated-paths":{"ref":"index.html#downcase-and-dash-separated-paths","tf":0.07142857142857142}}}}},"u":{"docs":{},"s":{"docs":{"index.html#downcase-and-dash-separated-paths":{"ref":"index.html#downcase-and-dash-separated-paths","tf":0.07142857142857142}}}}}}}}}},"p":{"docs":{"index.html#goal-of-the-document":{"ref":"index.html#goal-of-the-document","tf":0.02040816326530612}},"l":{"docs":{},"i":{"docs":{"index.html#service-building-guidelines":{"ref":"index.html#service-building-guidelines","tf":0.01818181818181818}},"c":{"docs":{},"a":{"docs":{},"t":{"docs":{},"i":{"docs":{},"o":{"docs":{},"n":{"docs":{},"/":{"docs":{},"j":{"docs":{},"s":{"docs":{},"o":{"docs":{},"n":{"docs":{"index.html#require-versioning-headers":{"ref":"index.html#require-versioning-headers","tf":0.017543859649122806},"index.html#accept-serialized-json-in-request-bodies":{"ref":"index.html#accept-serialized-json-in-request-bodies","tf":0.021739130434782608}},";":{"docs":{},"c":{"docs":{},"h":{"docs":{},"a":{"docs":{},"r":{"docs":{},"s":{"docs":{},"e":{"docs":{},"t":{"docs":{},"=":{"docs":{},"u":{"docs":{},"t":{"docs":{},"f":{"docs":{"index.html#provide-full-resources-where-available":{"ref":"index.html#provide-full-resources-where-available","tf":0.029850746268656716}}}}}}}}}}}}}}}}}}}}}}}}}}},"r":{"docs":{},"o":{"docs":{},"p":{"docs":{},"r":{"docs":{},"i":{"docs":{"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":2.505649717514124}}}}},"a":{"docs":{},"c":{"docs":{},"h":{"docs":{"index.html#plan-stability-and-versioning":{"ref":"index.html#plan-stability-and-versioning","tf":0.02127659574468085},"index.html#(todo)-use-_link-for-foreign-key-relations":{"ref":"index.html#(todo)-use-_link-for-foreign-key-relations","tf":0.013888888888888888}}}}}}}}},"v":{"docs":{},"o":{"docs":{},"i":{"docs":{},"d":{"docs":{"index.html#goal-of-the-document":{"ref":"index.html#goal-of-the-document","tf":0.02040816326530612},"index.html#require-versioning-headers":{"ref":"index.html#require-versioning-headers","tf":0.017543859649122806},"index.html#require-https":{"ref":"index.html#require-https","tf":0.014705882352941176},"index.html#provide-resource-(uu)ids":{"ref":"index.html#provide-resource-(uu)ids","tf":0.011494252873563218},"index.html#design-for-failures":{"ref":"index.html#design-for-failures","tf":0.041666666666666664}}}}},"a":{"docs":{},"i":{"docs":{},"l":{"docs":{"index.html#divide-large-responses-across-requests-with-ranges":{"ref":"index.html#divide-large-responses-across-requests-with-ranges","tf":0.03571428571428571},"index.html#provide-full-resources-where-available":{"ref":"index.html#provide-full-resources-where-available","tf":2.5}}}}}},"l":{"docs":{},"w":{"docs":{},"a":{"docs":{},"y":{"docs":{"index.html#provide-certain-mandatory-artifactsactions":{"ref":"index.html#provide-certain-mandatory-artifactsactions","tf":0.018867924528301886},"index.html#follow-naming-conventions":{"ref":"index.html#follow-naming-conventions","tf":0.02702702702702703},"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.009259259259259259},"index.html#provide-full-resources-where-available":{"ref":"index.html#provide-full-resources-where-available","tf":0.014925373134328358}}}}},"l":{"docs":{},"o":{"docs":{},"w":{"docs":{"index.html#require-https":{"ref":"index.html#require-https","tf":0.014705882352941176},"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294},"index.html#separate-concerns":{"ref":"index.html#separate-concerns","tf":0.017857142857142856},"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.018518518518518517},"index.html#support-http-cache-headers":{"ref":"index.html#support-http-cache-headers","tf":0.027777777777777776}}}}},"r":{"docs":{},"e":{"docs":{},"a":{"docs":{},"d":{"docs":{},"i":{"docs":{"index.html#require-https":{"ref":"index.html#require-https","tf":0.014705882352941176}}}}}}},"i":{"docs":{},"g":{"docs":{},"n":{"docs":{"index.html#downcase-and-dash-separated-paths":{"ref":"index.html#downcase-and-dash-separated-paths","tf":0.07142857142857142},"index.html#service-has-a-single-responsibility":{"ref":"index.html#service-has-a-single-responsibility","tf":0.027777777777777776}}}},"c":{"docs":{"index.html#(todo)-use-_link-for-foreign-key-relations":{"ref":"index.html#(todo)-use-_link-for-foreign-key-relations","tf":0.013888888888888888}},"e":{"docs":{},"@":{"docs":{},"h":{"docs":{},"e":{"docs":{},"r":{"docs":{},"o":{"docs":{},"k":{"docs":{},"u":{"docs":{},".":{"docs":{},"c":{"docs":{},"o":{"docs":{},"m":{"docs":{"index.html#gzip-and-keep-json-minified-in-all-responses":{"ref":"index.html#gzip-and-keep-json-minified-in-all-responses","tf":0.016129032258064516},"index.html#(todo)-use-_link-for-foreign-key-relations":{"ref":"index.html#(todo)-use-_link-for-foreign-key-relations","tf":0.013888888888888888}}}}}}}}}}}}}}}},"e":{"docs":{},"r":{"docs":{},"t":{"docs":{"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.009259259259259259}}}}}},"r":{"docs":{},"t":{"docs":{},"i":{"docs":{},"f":{"docs":{},"a":{"docs":{},"c":{"docs":{},"t":{"docs":{},"s":{"docs":{},"/":{"docs":{},"a":{"docs":{},"c":{"docs":{},"t":{"docs":{"index.html#provide-certain-mandatory-artifactsactions":{"ref":"index.html#provide-certain-mandatory-artifactsactions","tf":2.518867924528302}}}}}}}}}}}}},"r":{"docs":{},"a":{"docs":{},"y":{"docs":{"index.html#use-consistent-http-methods":{"ref":"index.html#use-consistent-http-methods","tf":0.011904761904761904},"index.html#use-json-naming-conventions":{"ref":"index.html#use-json-naming-conventions","tf":0.014285714285714285},"index.html#use-consistent-query-parameter-types":{"ref":"index.html#use-consistent-query-parameter-types","tf":0.02702702702702703}}}}},"c":{"docs":{},"h":{"docs":{},"i":{"docs":{},"t":{"docs":{},"e":{"docs":{},"c":{"docs":{},"t":{"docs":{},"u":{"docs":{},"r":{"docs":{"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":1.6759259259259258},"index.html#service-building-guidelines":{"ref":"index.html#service-building-guidelines","tf":0.10909090909090909}}}}}}}}}}}},"u":{"docs":{},"t":{"docs":{},"h":{"docs":{},"e":{"docs":{},"n":{"docs":{},"t":{"docs":{"index.html#(todo)-implement-authentication-with-openid-connect":{"ref":"index.html#(todo)-implement-authentication-with-openid-connect","tf":2},"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.011299435028248588},"index.html#delegate-common-service-needs-to-an-api-gateway":{"ref":"index.html#delegate-common-service-needs-to-an-api-gateway","tf":0.09523809523809523}}}}},"o":{"docs":{},"r":{"docs":{"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.011299435028248588}}}}},"o":{"docs":{"index.html#provide-resource-(uu)ids":{"ref":"index.html#provide-resource-(uu)ids","tf":0.011494252873563218}},"m":{"docs":{},"a":{"docs":{},"t":{"docs":{"index.html#gzip-and-keep-json-minified-in-all-responses":{"ref":"index.html#gzip-and-keep-json-minified-in-all-responses","tf":0.016129032258064516}}}}}}}},"c":{"docs":{},"c":{"docs":{},"e":{"docs":{},"p":{"docs":{},"t":{"docs":{"index.html#require-versioning-headers":{"ref":"index.html#require-versioning-headers","tf":0.03508771929824561},"index.html#accept-serialized-json-in-request-bodies":{"ref":"index.html#accept-serialized-json-in-request-bodies","tf":2.0217391304347827},"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294},"index.html#use-utc-times-formatted-in-iso8601":{"ref":"index.html#use-utc-times-formatted-in-iso8601","tf":0.06666666666666667},"index.html#provide-full-resources-where-available":{"ref":"index.html#provide-full-resources-where-available","tf":0.014925373134328358}}}},"s":{"docs":{},"s":{"docs":{"index.html#require-https":{"ref":"index.html#require-https","tf":0.014705882352941176},"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.011299435028248588},"index.html#design-for-failures":{"ref":"index.html#design-for-failures","tf":0.041666666666666664},"index.html#delegate-common-service-needs-to-an-api-gateway":{"ref":"index.html#delegate-common-service-needs-to-an-api-gateway","tf":0.047619047619047616}}}}},"o":{"docs":{},"r":{"docs":{},"d":{"docs":{"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294},"index.html#plan-stability-and-versioning":{"ref":"index.html#plan-stability-and-versioning","tf":0.02127659574468085}}}},"m":{"docs":{},"p":{"docs":{},"a":{"docs":{},"n":{"docs":{},"i":{"docs":{"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428}}}}}}}}},"t":{"docs":{},"i":{"docs":{},"o":{"docs":{},"n":{"docs":{"index.html#use-consistent-http-methods":{"ref":"index.html#use-consistent-http-methods","tf":0.011904761904761904},"index.html#special-action-endpoints":{"ref":"index.html#special-action-endpoints","tf":3.4712643678160915}}}}},"u":{"docs":{},"a":{"docs":{},"l":{"docs":{"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.009259259259259259}}}}}},"k":{"docs":{},"n":{"docs":{},"o":{"docs":{},"w":{"docs":{},"l":{"docs":{},"e":{"docs":{},"d":{"docs":{},"g":{"docs":{"index.html#use-json-naming-conventions":{"ref":"index.html#use-json-naming-conventions","tf":0.014285714285714285}}}}}}}}}}},"s":{"docs":{},"p":{"docs":{},"e":{"docs":{},"c":{"docs":{},"t":{"docs":{"index.html#require-versioning-headers":{"ref":"index.html#require-versioning-headers","tf":0.017543859649122806}}}}}},"s":{"docs":{},"o":{"docs":{},"r":{"docs":{},"t":{"docs":{"index.html#minimize-path-nesting":{"ref":"index.html#minimize-path-nesting","tf":0.021739130434782608}},"m":{"docs":{},"e":{"docs":{},"n":{"docs":{},"t":{"docs":{},"s":{"docs":{},"/":{"docs":{},":":{"docs":{},"a":{"docs":{},"s":{"docs":{},"s":{"docs":{},"o":{"docs":{},"r":{"docs":{},"t":{"docs":{},"m":{"docs":{},"e":{"docs":{},"n":{"docs":{},"t":{"docs":{},"i":{"docs":{},"d":{"docs":{"index.html#minimize-path-nesting":{"ref":"index.html#minimize-path-nesting","tf":0.021739130434782608}},"/":{"docs":{},"p":{"docs":{},"r":{"docs":{},"o":{"docs":{},"d":{"docs":{},"u":{"docs":{},"c":{"docs":{},"t":{"docs":{"index.html#minimize-path-nesting":{"ref":"index.html#minimize-path-nesting","tf":0.021739130434782608}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}},"u":{"docs":{},"m":{"docs":{"index.html#design-for-failures":{"ref":"index.html#design-for-failures","tf":0.041666666666666664}}}}},"y":{"docs":{},"n":{"docs":{},"c":{"docs":{},"h":{"docs":{},"r":{"docs":{},"o":{"docs":{},"n":{"docs":{"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294}}}}}}}}}},"g":{"docs":{},"a":{"docs":{},"i":{"docs":{},"n":{"docs":{},"s":{"docs":{},"t":{"docs":{"index.html#use-consistent-http-methods":{"ref":"index.html#use-consistent-http-methods","tf":0.011904761904761904}}}}}}}},"t":{"docs":{},"t":{"docs":{},"r":{"docs":{},"i":{"docs":{},"b":{"docs":{},"u":{"docs":{},"t":{"docs":{"index.html#use-consistent-http-methods":{"ref":"index.html#use-consistent-http-methods","tf":0.023809523809523808},"index.html#use-json-naming-conventions":{"ref":"index.html#use-json-naming-conventions","tf":0.014285714285714285},"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294},"index.html#provide-resource-(uu)ids":{"ref":"index.html#provide-resource-(uu)ids","tf":0.011494252873563218},"index.html#provide-full-resources-where-available":{"ref":"index.html#provide-full-resources-where-available","tf":0.014925373134328358}}}}}}},"e":{"docs":{},"n":{"docs":{},"t":{"docs":{"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294}}}}},"a":{"docs":{},"c":{"docs":{},"h":{"docs":{"index.html#services-are-independent":{"ref":"index.html#services-are-independent","tf":0.023809523809523808}}}}}}},"=":{"1":{"docs":{"index.html#use-consistent-query-parameter-types":{"ref":"index.html#use-consistent-query-parameter-types","tf":0.02702702702702703}}},"docs":{},"f":{"docs":{},"a":{"docs":{},"l":{"docs":{},"s":{"docs":{"index.html#use-consistent-query-parameter-types":{"ref":"index.html#use-consistent-query-parameter-types","tf":0.05405405405405406}}}}}},"t":{"docs":{},"r":{"docs":{},"u":{"docs":{"index.html#use-consistent-query-parameter-types":{"ref":"index.html#use-consistent-query-parameter-types","tf":0.02702702702702703}}}}}},"b":{"docs":{},"o":{"docs":{},"v":{"docs":{"index.html#minimize-path-nesting":{"ref":"index.html#minimize-path-nesting","tf":0.021739130434782608},"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294}}}}},"n":{"docs":{},"d":{"docs":{},"/":{"docs":{},"o":{"docs":{},"r":{"docs":{"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294}}}}}},"o":{"docs":{},"t":{"docs":{},"h":{"docs":{"index.html#provide-resource-(uu)ids":{"ref":"index.html#provide-resource-(uu)ids","tf":0.011494252873563218},"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428},"index.html#services-are-independent":{"ref":"index.html#services-are-independent","tf":0.023809523809523808}}}}}},"i":{"docs":{},"m":{"docs":{"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428}}}},"f":{"docs":{},"f":{"docs":{},"e":{"docs":{},"c":{"docs":{},"t":{"docs":{"index.html#services-are-independent":{"ref":"index.html#services-are-independent","tf":0.023809523809523808}}}}}}}},"c":{"docs":{},"o":{"docs":{},"n":{"docs":{},"t":{"docs":{},"r":{"docs":{},"a":{"docs":{},"d":{"docs":{},"i":{"docs":{},"c":{"docs":{},"t":{"docs":{},"o":{"docs":{},"r":{"docs":{},"i":{"docs":{"index.html":{"ref":"index.html","tf":0.04}}}}}}}}}}},"e":{"docs":{},"n":{"docs":{},"t":{"docs":{"index.html#require-versioning-headers":{"ref":"index.html#require-versioning-headers","tf":0.017543859649122806},"index.html#accept-serialized-json-in-request-bodies":{"ref":"index.html#accept-serialized-json-in-request-bodies","tf":0.021739130434782608},"index.html#separate-concerns":{"ref":"index.html#separate-concerns","tf":0.017857142857142856},"index.html#provide-full-resources-where-available":{"ref":"index.html#provide-full-resources-where-available","tf":0.029850746268656716}}}},"x":{"docs":{},"t":{"docs":{"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294},"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428}}}}},"a":{"docs":{},"i":{"docs":{},"n":{"docs":{"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294},"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428}}}}}},"s":{"docs":{},"i":{"docs":{},"s":{"docs":{},"t":{"docs":{"index.html#goal-of-the-document":{"ref":"index.html#goal-of-the-document","tf":0.061224489795918366},"index.html#use-consistent-http-methods":{"ref":"index.html#use-consistent-http-methods","tf":2.5},"index.html#use-consistent-query-parameter-types":{"ref":"index.html#use-consistent-query-parameter-types","tf":2},"index.html#resource-names":{"ref":"index.html#resource-names","tf":0.045454545454545456},"index.html#respond-structured-and-consistent-errors":{"ref":"index.html#respond-structured-and-consistent-errors","tf":2.527027027027027}}}},"d":{"docs":{"index.html#use-consistent-query-parameter-types":{"ref":"index.html#use-consistent-query-parameter-types","tf":0.02702702702702703},"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.009259259259259259},"index.html#support-http-cache-headers":{"ref":"index.html#support-http-cache-headers","tf":0.027777777777777776}}}},"u":{"docs":{},"m":{"docs":{},"p":{"docs":{},"t":{"docs":{"index.html#gzip-and-keep-json-minified-in-all-responses":{"ref":"index.html#gzip-and-keep-json-minified-in-all-responses","tf":0.016129032258064516}}}}}}},"v":{"docs":{},"e":{"docs":{},"n":{"docs":{},"t":{"docs":{"index.html#goal-of-the-document":{"ref":"index.html#goal-of-the-document","tf":0.02040816326530612},"index.html#follow-naming-conventions":{"ref":"index.html#follow-naming-conventions","tf":3.468468468468468},"index.html#use-json-naming-conventions":{"ref":"index.html#use-json-naming-conventions","tf":2.5142857142857142}}}},"y":{"docs":{"index.html#separate-concerns":{"ref":"index.html#separate-concerns","tf":0.017857142857142856}}}}},"n":{"docs":{},"e":{"docs":{},"c":{"docs":{},"t":{"docs":{"index.html#provide-certain-mandatory-artifactsactions":{"ref":"index.html#provide-certain-mandatory-artifactsactions","tf":0.03773584905660377},"index.html#(todo)-implement-authentication-with-openid-connect":{"ref":"index.html#(todo)-implement-authentication-with-openid-connect","tf":2},"index.html#require-https":{"ref":"index.html#require-https","tf":0.014705882352941176},"index.html#provide-human-readable-documentation-via-api-connect":{"ref":"index.html#provide-human-readable-documentation-via-api-connect","tf":1.4579831932773106}}}}}},"f":{"docs":{},"i":{"docs":{},"g":{"docs":{},"u":{"docs":{},"r":{"docs":{"index.html#use-consistent-query-parameter-types":{"ref":"index.html#use-consistent-query-parameter-types","tf":0.02702702702702703}}}}}}},"c":{"docs":{},"e":{"docs":{},"r":{"docs":{},"n":{"docs":{"index.html#separate-concerns":{"ref":"index.html#separate-concerns","tf":5.017857142857143}}}}}}},"m":{"docs":{},"m":{"docs":{},"u":{"docs":{},"n":{"docs":{"index.html#goal-of-the-document":{"ref":"index.html#goal-of-the-document","tf":0.02040816326530612},"index.html#separate-concerns":{"ref":"index.html#separate-concerns","tf":0.017857142857142856}}}},"o":{"docs":{},"n":{"docs":{"index.html#provide-human-readable-documentation-via-api-connect":{"ref":"index.html#provide-human-readable-documentation-via-api-connect","tf":0.029411764705882353},"index.html#delegate-common-service-needs-to-an-api-gateway":{"ref":"index.html#delegate-common-service-needs-to-an-api-gateway","tf":1.6666666666666665}}}}},"p":{"docs":{},"l":{"docs":{},"e":{"docs":{},"x":{"docs":{"index.html#use-consistent-query-parameter-types":{"ref":"index.html#use-consistent-query-parameter-types","tf":0.02702702702702703}}},"t":{"docs":{"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294}}}}},"r":{"docs":{},"e":{"docs":{},"s":{"docs":{},"s":{"docs":{"index.html#gzip-and-keep-json-minified-in-all-responses":{"ref":"index.html#gzip-and-keep-json-minified-in-all-responses","tf":0.016129032258064516}}}}}},"a":{"docs":{},"t":{"docs":{"index.html#plan-stability-and-versioning":{"ref":"index.html#plan-stability-and-versioning","tf":0.02127659574468085}}}}}},"d":{"docs":{},"e":{"docs":{"index.html#use-swagger-2.0-to-describe-apis":{"ref":"index.html#use-swagger-2.0-to-describe-apis","tf":0.04},"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":2.5338983050847457},"index.html#provide-resource-(uu)ids":{"ref":"index.html#provide-resource-(uu)ids","tf":0.011494252873563218},"index.html#divide-large-responses-across-requests-with-ranges":{"ref":"index.html#divide-large-responses-across-requests-with-ranges","tf":0.03571428571428571}}}},"r":{"docs":{},"r":{"docs":{},"e":{"docs":{},"c":{"docs":{},"t":{"docs":{"index.html#provide-human-readable-documentation-via-api-connect":{"ref":"index.html#provide-human-readable-documentation-via-api-connect","tf":0.029411764705882353},"index.html#use-json-naming-conventions":{"ref":"index.html#use-json-naming-conventions","tf":0.014285714285714285},"index.html#services-are-independent":{"ref":"index.html#services-are-independent","tf":0.023809523809523808}},"l":{"docs":{},"i":{"docs":{"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294}}}}}}}}},"l":{"docs":{},"l":{"docs":{},"e":{"docs":{},"c":{"docs":{},"t":{"docs":{"index.html#minimize-path-nesting":{"ref":"index.html#minimize-path-nesting","tf":0.021739130434782608},"index.html#separate-concerns":{"ref":"index.html#separate-concerns","tf":0.017857142857142856}}}}}}}},"r":{"docs":{},"e":{"docs":{},"a":{"docs":{},"t":{"docs":{"index.html#goal-of-the-document":{"ref":"index.html#goal-of-the-document","tf":0.02040816326530612},"index.html#provide-certain-mandatory-artifactsactions":{"ref":"index.html#provide-certain-mandatory-artifactsactions","tf":0.018867924528301886},"index.html#accept-serialized-json-in-request-bodies":{"ref":"index.html#accept-serialized-json-in-request-bodies","tf":0.021739130434782608},"index.html#use-consistent-http-methods":{"ref":"index.html#use-consistent-http-methods","tf":0.023809523809523808},"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.011299435028248588},"index.html#provide-resource-(uu)ids":{"ref":"index.html#provide-resource-(uu)ids","tf":0.011494252873563218},"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428},"index.html#plan-stability-and-versioning":{"ref":"index.html#plan-stability-and-versioning","tf":0.02127659574468085},"index.html#service-has-a-single-responsibility":{"ref":"index.html#service-has-a-single-responsibility","tf":0.027777777777777776}},"e":{"docs":{},"d":{"docs":{},"a":{"docs":{},"t":{"docs":{"index.html#gzip-and-keep-json-minified-in-all-responses":{"ref":"index.html#gzip-and-keep-json-minified-in-all-responses","tf":0.016129032258064516},"index.html#provide-full-resources-where-available":{"ref":"index.html#provide-full-resources-where-available","tf":0.014925373134328358},"index.html#provide-standard-timestamps":{"ref":"index.html#provide-standard-timestamps","tf":0.09523809523809523}}}}}}}}}},"e":{"docs":{},"r":{"docs":{},"t":{"docs":{},"a":{"docs":{},"i":{"docs":{},"n":{"docs":{"index.html#provide-certain-mandatory-artifactsactions":{"ref":"index.html#provide-certain-mandatory-artifactsactions","tf":2.5},"index.html#follow-naming-conventions":{"ref":"index.html#follow-naming-conventions","tf":0.02702702702702703},"index.html#service-building-guidelines":{"ref":"index.html#service-building-guidelines","tf":0.01818181818181818}}}}}}}},"h":{"docs":{},"a":{"docs":{},"l":{"docs":{},"l":{"docs":{},"e":{"docs":{},"n":{"docs":{},"g":{"docs":{"index.html#require-versioning-headers":{"ref":"index.html#require-versioning-headers","tf":0.017543859649122806}}}}}}},"n":{"docs":{},"g":{"docs":{"index.html#require-versioning-headers":{"ref":"index.html#require-versioning-headers","tf":0.03508771929824561},"index.html#follow-naming-conventions":{"ref":"index.html#follow-naming-conventions","tf":0.02702702702702703},"index.html#plan-stability-and-versioning":{"ref":"index.html#plan-stability-and-versioning","tf":0.06382978723404255},"index.html#(todo)-use-_link-for-foreign-key-relations":{"ref":"index.html#(todo)-use-_link-for-foreign-key-relations","tf":0.013888888888888888}}}}},"o":{"docs":{},"o":{"docs":{},"s":{"docs":{"index.html#follow-naming-conventions":{"ref":"index.html#follow-naming-conventions","tf":0.02702702702702703}}}},"i":{"docs":{},"c":{"docs":{"index.html#service-has-a-single-responsibility":{"ref":"index.html#service-has-a-single-responsibility","tf":0.027777777777777776}}}}},"i":{"docs":{},"l":{"docs":{},"d":{"docs":{"index.html#respond-structured-and-consistent-errors":{"ref":"index.html#respond-structured-and-consistent-errors","tf":0.02702702702702703}}}}},"e":{"docs":{},"c":{"docs":{},"k":{"docs":{"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294}}}}}},"u":{"docs":{},"s":{"docs":{},"t":{"docs":{},"o":{"docs":{},"m":{"docs":{"index.html#require-versioning-headers":{"ref":"index.html#require-versioning-headers","tf":0.017543859649122806},"index.html#services-should-have-multiple-environments":{"ref":"index.html#services-should-have-multiple-environments","tf":0.017241379310344827}}}}}},"r":{"docs":{},"l":{"docs":{"index.html#accept-serialized-json-in-request-bodies":{"ref":"index.html#accept-serialized-json-in-request-bodies","tf":0.021739130434782608},"index.html#provide-full-resources-where-available":{"ref":"index.html#provide-full-resources-where-available","tf":0.029850746268656716}}}}},"a":{"docs":{},"l":{"docs":{},"l":{"docs":{"index.html#require-https":{"ref":"index.html#require-https","tf":0.014705882352941176},"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.022598870056497175}}}},"s":{"docs":{},"e":{"docs":{"index.html#special-action-endpoints":{"ref":"index.html#special-action-endpoints","tf":0.034482758620689655},"index.html#minimize-path-nesting":{"ref":"index.html#minimize-path-nesting","tf":0.021739130434782608},"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294},"index.html#separate-concerns":{"ref":"index.html#separate-concerns","tf":0.017857142857142856},"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.009259259259259259},"index.html#support-http-cache-headers":{"ref":"index.html#support-http-cache-headers","tf":0.027777777777777776},"index.html#provide-standard-timestamps":{"ref":"index.html#provide-standard-timestamps","tf":0.047619047619047616}}}},"m":{"docs":{},"e":{"docs":{},"l":{"docs":{},"c":{"docs":{},"a":{"docs":{},"s":{"docs":{"index.html#use-json-naming-conventions":{"ref":"index.html#use-json-naming-conventions","tf":0.014285714285714285},"index.html#camelcase-query-parameters":{"ref":"index.html#camelcase-query-parameters","tf":3.476190476190476}}}}}}}},"r":{"docs":{},"e":{"docs":{},"f":{"docs":{},"u":{"docs":{},"l":{"docs":{},"l":{"docs":{},"i":{"docs":{"index.html#provide-resource-(uu)ids":{"ref":"index.html#provide-resource-(uu)ids","tf":0.011494252873563218}}}}}}}}},"c":{"docs":{},"h":{"docs":{"index.html#support-http-cache-headers":{"ref":"index.html#support-http-cache-headers","tf":2.5833333333333335}}}},"p":{"docs":{},"a":{"docs":{},"b":{"docs":{},"l":{"docs":{"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428},"index.html#service-has-a-single-responsibility":{"ref":"index.html#service-has-a-single-responsibility","tf":0.027777777777777776}}}}}}},"l":{"docs":{},"e":{"docs":{},"a":{"docs":{},"r":{"docs":{"index.html#require-https":{"ref":"index.html#require-https","tf":0.014705882352941176}},"l":{"docs":{},"i":{"docs":{"index.html#special-action-endpoints":{"ref":"index.html#special-action-endpoints","tf":0.034482758620689655}}}}}}},"i":{"docs":{},"e":{"docs":{},"n":{"docs":{},"t":{"docs":{"index.html#require-https":{"ref":"index.html#require-https","tf":0.029411764705882353},"index.html#provide-human-readable-documentation-via-api-connect":{"ref":"index.html#provide-human-readable-documentation-via-api-connect","tf":0.029411764705882353},"index.html#provide-request-ids-for-introspection":{"ref":"index.html#provide-request-ids-for-introspection","tf":0.045454545454545456},"index.html#gzip-and-keep-json-minified-in-all-responses":{"ref":"index.html#gzip-and-keep-json-minified-in-all-responses","tf":0.03225806451612903}}}}}},"o":{"docs":{},"s":{"docs":{},"e":{"docs":{"index.html#services-should-have-multiple-environments":{"ref":"index.html#services-should-have-multiple-environments","tf":0.017241379310344827}}}}}},"d":{"docs":{},"e":{"docs":{},"f":{"docs":{"index.html#accept-serialized-json-in-request-bodies":{"ref":"index.html#accept-serialized-json-in-request-bodies","tf":0.043478260869565216},"index.html#provide-resource-(uu)ids":{"ref":"index.html#provide-resource-(uu)ids","tf":0.011494252873563218},"index.html#gzip-and-keep-json-minified-in-all-responses":{"ref":"index.html#gzip-and-keep-json-minified-in-all-responses","tf":0.03225806451612903},"index.html#provide-full-resources-where-available":{"ref":"index.html#provide-full-resources-where-available","tf":0.014925373134328358},"index.html#(todo)-use-_link-for-foreign-key-relations":{"ref":"index.html#(todo)-use-_link-for-foreign-key-relations","tf":0.041666666666666664}}}}},"y":{"docs":{},"c":{"docs":{},"l":{"docs":{"index.html#separate-concerns":{"ref":"index.html#separate-concerns","tf":0.017857142857142856}}}}},"p":{"docs":{},"u":{"docs":{"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.009259259259259259}}}}},"d":{"docs":{"index.html#accept-serialized-json-in-request-bodies":{"ref":"index.html#accept-serialized-json-in-request-bodies","tf":0.021739130434782608}},"e":{"docs":{},"s":{"docs":{},"i":{"docs":{},"g":{"docs":{},"n":{"docs":{"index.html":{"ref":"index.html","tf":3.29},"index.html#goal-of-the-document":{"ref":"index.html#goal-of-the-document","tf":0.8112244897959183},"index.html#services-must":{"ref":"index.html#services-must","tf":0.75},"index.html#provide-certain-mandatory-artifactsactions":{"ref":"index.html#provide-certain-mandatory-artifactsactions","tf":0.75},"index.html#(todo)-implement-authentication-with-openid-connect":{"ref":"index.html#(todo)-implement-authentication-with-openid-connect","tf":0.75},"index.html#require-versioning-headers":{"ref":"index.html#require-versioning-headers","tf":0.7675438596491229},"index.html#(todo)-when-and-how-to-bump-api-version":{"ref":"index.html#(todo)-when-and-how-to-bump-api-version","tf":0.75},"index.html#require-https":{"ref":"index.html#require-https","tf":0.75},"index.html#use-swagger-2.0-to-describe-apis":{"ref":"index.html#use-swagger-2.0-to-describe-apis","tf":0.75},"index.html#provide-human-readable-documentation-via-api-connect":{"ref":"index.html#provide-human-readable-documentation-via-api-connect","tf":0.75},"index.html#accept-serialized-json-in-request-bodies":{"ref":"index.html#accept-serialized-json-in-request-bodies","tf":0.75},"index.html#use-consistent-http-methods":{"ref":"index.html#use-consistent-http-methods","tf":0.75},"index.html#special-action-endpoints":{"ref":"index.html#special-action-endpoints","tf":0.75},"index.html#follow-naming-conventions":{"ref":"index.html#follow-naming-conventions","tf":0.75},"index.html#use-json-naming-conventions":{"ref":"index.html#use-json-naming-conventions","tf":0.75},"index.html#downcase-and-dash-separated-paths":{"ref":"index.html#downcase-and-dash-separated-paths","tf":0.75},"index.html#camelcase-query-parameters":{"ref":"index.html#camelcase-query-parameters","tf":0.75},"index.html#use-consistent-query-parameter-types":{"ref":"index.html#use-consistent-query-parameter-types","tf":0.75},"index.html#minimize-path-nesting":{"ref":"index.html#minimize-path-nesting","tf":0.75},"index.html#resource-names":{"ref":"index.html#resource-names","tf":0.75},"index.html#respond-structured-and-consistent-errors":{"ref":"index.html#respond-structured-and-consistent-errors","tf":0.75},"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.75},"index.html#use-utc-times-formatted-in-iso8601":{"ref":"index.html#use-utc-times-formatted-in-iso8601","tf":0.75},"index.html#provide-resource-(uu)ids":{"ref":"index.html#provide-resource-(uu)ids","tf":0.75},"index.html#services-should":{"ref":"index.html#services-should","tf":0.75},"index.html#separate-concerns":{"ref":"index.html#separate-concerns","tf":0.7678571428571429},"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.75},"index.html#divide-large-responses-across-requests-with-ranges":{"ref":"index.html#divide-large-responses-across-requests-with-ranges","tf":0.75},"index.html#provide-request-ids-for-introspection":{"ref":"index.html#provide-request-ids-for-introspection","tf":0.75},"index.html#support-http-cache-headers":{"ref":"index.html#support-http-cache-headers","tf":0.75},"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.75},"index.html#gzip-and-keep-json-minified-in-all-responses":{"ref":"index.html#gzip-and-keep-json-minified-in-all-responses","tf":0.75},"index.html#provide-full-resources-where-available":{"ref":"index.html#provide-full-resources-where-available","tf":0.75},"index.html#provide-standard-timestamps":{"ref":"index.html#provide-standard-timestamps","tf":0.75},"index.html#plan-stability-and-versioning":{"ref":"index.html#plan-stability-and-versioning","tf":0.75},"index.html#(todo)-use-_link-for-foreign-key-relations":{"ref":"index.html#(todo)-use-_link-for-foreign-key-relations","tf":0.75},"index.html#service-building-guidelines":{"ref":"index.html#service-building-guidelines","tf":0.7863636363636364},"index.html#service-has-a-single-responsibility":{"ref":"index.html#service-has-a-single-responsibility","tf":0.75},"index.html#services-are-independent":{"ref":"index.html#services-are-independent","tf":0.7738095238095238},"index.html#design-for-failures":{"ref":"index.html#design-for-failures","tf":5.75},"index.html#delegate-common-service-needs-to-an-api-gateway":{"ref":"index.html#delegate-common-service-needs-to-an-api-gateway","tf":0.75},"index.html#services-should-have-multiple-environments":{"ref":"index.html#services-should-have-multiple-environments","tf":0.75}}}},"r":{"docs":{"index.html#provide-human-readable-documentation-via-api-connect":{"ref":"index.html#provide-human-readable-documentation-via-api-connect","tf":0.029411764705882353}}}},"c":{"docs":{},"r":{"docs":{},"i":{"docs":{},"b":{"docs":{"index.html#use-swagger-2.0-to-describe-apis":{"ref":"index.html#use-swagger-2.0-to-describe-apis","tf":2.04},"index.html#plan-stability-and-versioning":{"ref":"index.html#plan-stability-and-versioning","tf":0.02127659574468085}}},"p":{"docs":{},"t":{"docs":{"index.html#use-swagger-2.0-to-describe-apis":{"ref":"index.html#use-swagger-2.0-to-describe-apis","tf":0.04},"index.html#use-consistent-http-methods":{"ref":"index.html#use-consistent-http-methods","tf":0.011904761904761904}}}}}}}},"v":{"docs":{"index.html#services-should-have-multiple-environments":{"ref":"index.html#services-should-have-multiple-environments","tf":0.017241379310344827}},"e":{"docs":{},"l":{"docs":{},"o":{"docs":{},"p":{"docs":{"index.html#goal-of-the-document":{"ref":"index.html#goal-of-the-document","tf":0.04081632653061224},"index.html#provide-certain-mandatory-artifactsactions":{"ref":"index.html#provide-certain-mandatory-artifactsactions","tf":0.03773584905660377},"index.html#delegate-common-service-needs-to-an-api-gateway":{"ref":"index.html#delegate-common-service-needs-to-an-api-gateway","tf":0.047619047619047616},"index.html#services-should-have-multiple-environments":{"ref":"index.html#services-should-have-multiple-environments","tf":0.034482758620689655}}}}}}},"f":{"docs":{},"a":{"docs":{},"u":{"docs":{},"l":{"docs":{},"t":{"docs":{"index.html#require-versioning-headers":{"ref":"index.html#require-versioning-headers","tf":0.017543859649122806},"index.html#provide-resource-(uu)ids":{"ref":"index.html#provide-resource-(uu)ids","tf":0.011494252873563218},"index.html#support-http-cache-headers":{"ref":"index.html#support-http-cache-headers","tf":0.027777777777777776},"index.html#provide-standard-timestamps":{"ref":"index.html#provide-standard-timestamps","tf":0.047619047619047616}}}}}},"i":{"docs":{},"n":{"docs":{"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.009259259259259259}}}}},"t":{"docs":{},"a":{"docs":{},"i":{"docs":{},"l":{"docs":{"index.html#provide-human-readable-documentation-via-api-connect":{"ref":"index.html#provide-human-readable-documentation-via-api-connect","tf":0.029411764705882353},"index.html#divide-large-responses-across-requests-with-ranges":{"ref":"index.html#divide-large-responses-across-requests-with-ranges","tf":0.03571428571428571},"index.html#service-building-guidelines":{"ref":"index.html#service-building-guidelines","tf":0.01818181818181818}}}}},"e":{"docs":{},"r":{"docs":{},"m":{"docs":{},"i":{"docs":{},"n":{"docs":{"index.html#support-http-cache-headers":{"ref":"index.html#support-http-cache-headers","tf":0.027777777777777776}}}}}}}},"m":{"docs":{},"o":{"docs":{},"a":{"docs":{},"p":{"docs":{},"p":{"docs":{"index.html#accept-serialized-json-in-request-bodies":{"ref":"index.html#accept-serialized-json-in-request-bodies","tf":0.043478260869565216}}}}}}},"l":{"docs":{},"e":{"docs":{},"t":{"docs":{"index.html#use-consistent-http-methods":{"ref":"index.html#use-consistent-http-methods","tf":0.047619047619047616},"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.011299435028248588},"index.html#provide-full-resources-where-available":{"ref":"index.html#provide-full-resources-where-available","tf":0.04477611940298507}}},"g":{"docs":{"index.html#delegate-common-service-needs-to-an-api-gateway":{"ref":"index.html#delegate-common-service-needs-to-an-api-gateway","tf":1.6666666666666665}}}},"i":{"docs":{},"n":{"docs":{"index.html#special-action-endpoints":{"ref":"index.html#special-action-endpoints","tf":0.034482758620689655}}}}},"e":{"docs":{},"p":{"docs":{},"l":{"docs":{},"i":{"docs":{"index.html#minimize-path-nesting":{"ref":"index.html#minimize-path-nesting","tf":0.021739130434782608}}}}}},"p":{"docs":{},"t":{"docs":{},"h":{"docs":{"index.html#minimize-path-nesting":{"ref":"index.html#minimize-path-nesting","tf":0.043478260869565216},"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.009259259259259259}}}},"l":{"docs":{},"o":{"docs":{},"y":{"docs":{"index.html#services-are-independent":{"ref":"index.html#services-are-independent","tf":0.047619047619047616},"index.html#services-should-have-multiple-environments":{"ref":"index.html#services-should-have-multiple-environments","tf":0.034482758620689655}}}}},"e":{"docs":{},"n":{"docs":{},"d":{"docs":{},"e":{"docs":{},"n":{"docs":{},"c":{"docs":{},"i":{"docs":{},"e":{"docs":{},"s":{"docs":{},"(":{"docs":{},"p":{"docs":{},"o":{"docs":{},"s":{"docs":{},"t":{"docs":{},"g":{"docs":{},"r":{"docs":{"index.html#services-should-have-multiple-environments":{"ref":"index.html#services-should-have-multiple-environments","tf":0.017241379310344827}}}}}}}}}}}}}}}}}}},"c":{"docs":{},"o":{"docs":{},"u":{"docs":{},"p":{"docs":{},"l":{"docs":{"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.009259259259259259}}}}}},"l":{"docs":{},"a":{"docs":{},"r":{"docs":{"index.html#plan-stability-and-versioning":{"ref":"index.html#plan-stability-and-versioning","tf":0.02127659574468085}}}}}},"b":{"docs":{},"u":{"docs":{},"g":{"docs":{"index.html#provide-request-ids-for-introspection":{"ref":"index.html#provide-request-ids-for-introspection","tf":0.045454545454545456}}}}},"a":{"docs":{},"l":{"docs":{"index.html#services-should-have-multiple-environments":{"ref":"index.html#services-should-have-multiple-environments","tf":0.017241379310344827}}}}},"o":{"docs":{},"c":{"docs":{},"p":{"docs":{},"r":{"docs":{},"e":{"docs":{},"s":{"docs":{},"s":{"docs":{"index.html":{"ref":"index.html","tf":0.04}}}}}}},"u":{"docs":{},"m":{"docs":{},"e":{"docs":{},"n":{"docs":{},"t":{"docs":{"index.html":{"ref":"index.html","tf":0.08},"index.html#goal-of-the-document":{"ref":"index.html#goal-of-the-document","tf":5.020408163265306},"index.html#provide-certain-mandatory-artifactsactions":{"ref":"index.html#provide-certain-mandatory-artifactsactions","tf":0.03773584905660377},"index.html#provide-human-readable-documentation-via-api-connect":{"ref":"index.html#provide-human-readable-documentation-via-api-connect","tf":1.4285714285714284},"index.html#follow-naming-conventions":{"ref":"index.html#follow-naming-conventions","tf":0.02702702702702703}}}}}}},"k":{"docs":{},"e":{"docs":{},"r":{"docs":{"index.html#provide-certain-mandatory-artifactsactions":{"ref":"index.html#provide-certain-mandatory-artifactsactions","tf":0.018867924528301886}}}}}},"u":{"docs":{},"b":{"docs":{},"l":{"docs":{"index.html#require-https":{"ref":"index.html#require-https","tf":0.014705882352941176}}}}},"n":{"docs":{},"’":{"docs":{},"t":{"docs":{"index.html#use-swagger-2.0-to-describe-apis":{"ref":"index.html#use-swagger-2.0-to-describe-apis","tf":0.04},"index.html#special-action-endpoints":{"ref":"index.html#special-action-endpoints","tf":0.034482758620689655},"index.html#provide-resource-(uu)ids":{"ref":"index.html#provide-resource-(uu)ids","tf":0.011494252873563218},"index.html#service-has-a-single-responsibility":{"ref":"index.html#service-has-a-single-responsibility","tf":0.027777777777777776}}}}},"w":{"docs":{},"n":{"docs":{"index.html#services-are-independent":{"ref":"index.html#services-are-independent","tf":0.023809523809523808},"index.html#design-for-failures":{"ref":"index.html#design-for-failures","tf":0.041666666666666664}},"c":{"docs":{},"a":{"docs":{},"s":{"docs":{"index.html#downcase-and-dash-separated-paths":{"ref":"index.html#downcase-and-dash-separated-paths","tf":2.5714285714285716},"index.html#provide-resource-(uu)ids":{"ref":"index.html#provide-resource-(uu)ids","tf":0.011494252873563218}}}}}}},"m":{"docs":{},"a":{"docs":{},"i":{"docs":{},"n":{"docs":{"index.html#service-building-guidelines":{"ref":"index.html#service-building-guidelines","tf":0.01818181818181818},"index.html#service-has-a-single-responsibility":{"ref":"index.html#service-has-a-single-responsibility","tf":0.027777777777777776}}}}}}},"i":{"docs":{},"f":{"docs":{},"f":{"docs":{},"i":{"docs":{},"c":{"docs":{},"u":{"docs":{},"l":{"docs":{},"t":{"docs":{"index.html#require-versioning-headers":{"ref":"index.html#require-versioning-headers","tf":0.017543859649122806}}}}}}},"e":{"docs":{},"r":{"docs":{"index.html#provide-human-readable-documentation-via-api-connect":{"ref":"index.html#provide-human-readable-documentation-via-api-connect","tf":0.029411764705882353},"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294},"index.html#provide-resource-(uu)ids":{"ref":"index.html#provide-resource-(uu)ids","tf":0.011494252873563218},"index.html#separate-concerns":{"ref":"index.html#separate-concerns","tf":0.017857142857142856},"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.018518518518518517},"index.html#support-http-cache-headers":{"ref":"index.html#support-http-cache-headers","tf":0.027777777777777776},"index.html#delegate-common-service-needs-to-an-api-gateway":{"ref":"index.html#delegate-common-service-needs-to-an-api-gateway","tf":0.047619047619047616}}}}}},"s":{"docs":{},"c":{"docs":{},"o":{"docs":{},"u":{"docs":{},"r":{"docs":{},"a":{"docs":{},"g":{"docs":{"index.html#require-https":{"ref":"index.html#require-https","tf":0.014705882352941176}}}}}}},"u":{"docs":{},"s":{"docs":{},"s":{"docs":{"index.html#divide-large-responses-across-requests-with-ranges":{"ref":"index.html#divide-large-responses-across-requests-with-ranges","tf":0.03571428571428571}}}}}},"p":{"docs":{},"o":{"docs":{},"s":{"docs":{"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.009259259259259259}}}}}},"v":{"docs":{},"e":{"docs":{},"r":{"docs":{},"s":{"docs":{"index.html#separate-concerns":{"ref":"index.html#separate-concerns","tf":0.017857142857142856}}}}},"i":{"docs":{},"d":{"docs":{"index.html#divide-large-responses-across-requests-with-ranges":{"ref":"index.html#divide-large-responses-across-requests-with-ranges","tf":2}}}}},"a":{"docs":{},"g":{"docs":{},"n":{"docs":{},"o":{"docs":{},"s":{"docs":{"index.html#provide-request-ids-for-introspection":{"ref":"index.html#provide-request-ids-for-introspection","tf":0.045454545454545456}}}}}}}},"a":{"docs":{},"t":{"docs":{},"a":{"docs":{"index.html#require-https":{"ref":"index.html#require-https","tf":0.029411764705882353},"index.html#accept-serialized-json-in-request-bodies":{"ref":"index.html#accept-serialized-json-in-request-bodies","tf":0.021739130434782608},"index.html#use-json-naming-conventions":{"ref":"index.html#use-json-naming-conventions","tf":0.014285714285714285},"index.html#minimize-path-nesting":{"ref":"index.html#minimize-path-nesting","tf":0.021739130434782608},"index.html#divide-large-responses-across-requests-with-ranges":{"ref":"index.html#divide-large-responses-across-requests-with-ranges","tf":0.03571428571428571},"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.0625},"index.html#(todo)-use-_link-for-foreign-key-relations":{"ref":"index.html#(todo)-use-_link-for-foreign-key-relations","tf":0.027777777777777776},"index.html#service-has-a-single-responsibility":{"ref":"index.html#service-has-a-single-responsibility","tf":0.027777777777777776},"index.html#design-for-failures":{"ref":"index.html#design-for-failures","tf":0.041666666666666664}},"b":{"docs":{},"a":{"docs":{},"s":{"docs":{"index.html#service-has-a-single-responsibility":{"ref":"index.html#service-has-a-single-responsibility","tf":0.027777777777777776}}}}}}},"n":{"docs":{},"g":{"docs":{},"e":{"docs":{},"r":{"docs":{"index.html#use-json-naming-conventions":{"ref":"index.html#use-json-naming-conventions","tf":0.014285714285714285}}}}}},"s":{"docs":{},"h":{"docs":{"index.html#downcase-and-dash-separated-paths":{"ref":"index.html#downcase-and-dash-separated-paths","tf":2.5714285714285716}}}}},"u":{"docs":{},"r":{"docs":{},"e":{"docs":{"index.html#require-https":{"ref":"index.html#require-https","tf":0.014705882352941176}}}}}},"e":{"8":{"9":{"docs":{},"b":{"docs":{"index.html#use-json-naming-conventions":{"ref":"index.html#use-json-naming-conventions","tf":0.07142857142857142}}}},"docs":{}},"docs":{},"v":{"docs":{},"e":{"docs":{},"n":{"docs":{"index.html":{"ref":"index.html","tf":0.04},"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.009259259259259259}}},"r":{"docs":{},"y":{"docs":{},"t":{"docs":{},"h":{"docs":{"index.html#require-https":{"ref":"index.html#require-https","tf":0.014705882352941176}}}}}}}},"x":{"docs":{},"t":{"docs":{},"r":{"docs":{},"a":{"docs":{"index.html#gzip-and-keep-json-minified-in-all-responses":{"ref":"index.html#gzip-and-keep-json-minified-in-all-responses","tf":0.016129032258064516}},"c":{"docs":{},"t":{"docs":{"index.html":{"ref":"index.html","tf":0.04}}}}}},"e":{"docs":{},"n":{"docs":{},"d":{"docs":{"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428}}}},"r":{"docs":{},"n":{"docs":{"index.html#services-should-have-multiple-environments":{"ref":"index.html#services-should-have-multiple-environments","tf":0.017241379310344827}}}}}},"p":{"docs":{},"o":{"docs":{},"s":{"docs":{"index.html#provide-certain-mandatory-artifactsactions":{"ref":"index.html#provide-certain-mandatory-artifactsactions","tf":0.018867924528301886},"index.html#require-https":{"ref":"index.html#require-https","tf":0.014705882352941176},"index.html#provide-resource-(uu)ids":{"ref":"index.html#provide-resource-(uu)ids","tf":0.022988505747126436}}}},"l":{"docs":{},"a":{"docs":{},"i":{"docs":{},"n":{"docs":{"index.html#require-https":{"ref":"index.html#require-https","tf":0.014705882352941176}}}}}},"e":{"docs":{},"c":{"docs":{},"t":{"docs":{"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428}}}},"r":{"docs":{},"i":{"docs":{},"m":{"docs":{},"e":{"docs":{},"n":{"docs":{},"t":{"docs":{"index.html#services-should-have-multiple-environments":{"ref":"index.html#services-should-have-multiple-environments","tf":0.017241379310344827}}}}}}}}}},"c":{"docs":{},"e":{"docs":{},"p":{"docs":{},"t":{"docs":{"index.html#require-https":{"ref":"index.html#require-https","tf":0.014705882352941176}}}}},"h":{"docs":{},"a":{"docs":{},"n":{"docs":{},"g":{"docs":{"index.html#require-https":{"ref":"index.html#require-https","tf":0.014705882352941176}}}}}}},"a":{"docs":{},"m":{"docs":{},"p":{"docs":{},"l":{"docs":{"index.html#provide-human-readable-documentation-via-api-connect":{"ref":"index.html#provide-human-readable-documentation-via-api-connect","tf":0.058823529411764705},"index.html#use-consistent-http-methods":{"ref":"index.html#use-consistent-http-methods","tf":0.011904761904761904},"index.html#use-json-naming-conventions":{"ref":"index.html#use-json-naming-conventions","tf":0.014285714285714285},"index.html#use-consistent-query-parameter-types":{"ref":"index.html#use-consistent-query-parameter-types","tf":0.05405405405405406},"index.html#minimize-path-nesting":{"ref":"index.html#minimize-path-nesting","tf":0.021739130434782608},"index.html#resource-names":{"ref":"index.html#resource-names","tf":0.045454545454545456},"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.009259259259259259},"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.017857142857142856},"index.html#service-has-a-single-responsibility":{"ref":"index.html#service-has-a-single-responsibility","tf":0.027777777777777776},"index.html#services-are-independent":{"ref":"index.html#services-are-independent","tf":0.047619047619047616},"index.html#delegate-common-service-needs-to-an-api-gateway":{"ref":"index.html#delegate-common-service-needs-to-an-api-gateway","tf":0.047619047619047616}}}}}},"i":{"docs":{},"s":{"docs":{},"t":{"docs":{"index.html#use-consistent-http-methods":{"ref":"index.html#use-consistent-http-methods","tf":0.03571428571428571},"index.html#follow-naming-conventions":{"ref":"index.html#follow-naming-conventions","tf":0.02702702702702703},"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294},"index.html#provide-resource-(uu)ids":{"ref":"index.html#provide-resource-(uu)ids","tf":0.011494252873563218}}}}}},"n":{"docs":{},"s":{"docs":{},"u":{"docs":{},"r":{"docs":{"index.html#goal-of-the-document":{"ref":"index.html#goal-of-the-document","tf":0.02040816326530612}}}}},"v":{"docs":{},"i":{"docs":{},"r":{"docs":{},"o":{"docs":{},"n":{"docs":{"index.html#provide-certain-mandatory-artifactsactions":{"ref":"index.html#provide-certain-mandatory-artifactsactions","tf":0.018867924528301886},"index.html#require-https":{"ref":"index.html#require-https","tf":0.014705882352941176},"index.html#services-should-have-multiple-environments":{"ref":"index.html#services-should-have-multiple-environments","tf":3.4540229885057467}}}}}}},"d":{"docs":{"index.html#service-has-a-single-responsibility":{"ref":"index.html#service-has-a-single-responsibility","tf":0.027777777777777776},"index.html#services-should-have-multiple-environments":{"ref":"index.html#services-should-have-multiple-environments","tf":0.017241379310344827}},"p":{"docs":{},"o":{"docs":{},"i":{"docs":{},"n":{"docs":{},"t":{"docs":{"index.html#use-swagger-2.0-to-describe-apis":{"ref":"index.html#use-swagger-2.0-to-describe-apis","tf":0.08},"index.html#provide-human-readable-documentation-via-api-connect":{"ref":"index.html#provide-human-readable-documentation-via-api-connect","tf":0.029411764705882353},"index.html#special-action-endpoints":{"ref":"index.html#special-action-endpoints","tf":3.3678160919540225},"index.html#plan-stability-and-versioning":{"ref":"index.html#plan-stability-and-versioning","tf":0.02127659574468085}}}}}}},"d":{"docs":{},"a":{"docs":{},"t":{"docs":{"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294}}}}}},"c":{"docs":{},"o":{"docs":{},"d":{"docs":{"index.html#accept-serialized-json-in-request-bodies":{"ref":"index.html#accept-serialized-json-in-request-bodies","tf":0.021739130434782608}}}}},"t":{"docs":{},"i":{"docs":{},"t":{"docs":{},"i":{"docs":{"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294},"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.026785714285714284}}}}}},"a":{"docs":{},"b":{"docs":{},"l":{"docs":{"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428}}}}}},"a":{"docs":{},"s":{"docs":{},"i":{"docs":{},"e":{"docs":{},"r":{"docs":{"index.html#provide-certain-mandatory-artifactsactions":{"ref":"index.html#provide-certain-mandatory-artifactsactions","tf":0.018867924528301886},"index.html#follow-naming-conventions":{"ref":"index.html#follow-naming-conventions","tf":0.02702702702702703}}}}}},"c":{"docs":{},"h":{"docs":{"index.html#use-consistent-http-methods":{"ref":"index.html#use-consistent-http-methods","tf":0.011904761904761904},"index.html#follow-naming-conventions":{"ref":"index.html#follow-naming-conventions","tf":0.02702702702702703},"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294},"index.html#provide-resource-(uu)ids":{"ref":"index.html#provide-resource-(uu)ids","tf":0.011494252873563218},"index.html#provide-request-ids-for-introspection":{"ref":"index.html#provide-request-ids-for-introspection","tf":0.045454545454545456},"index.html#design-for-failures":{"ref":"index.html#design-for-failures","tf":0.041666666666666664},"index.html#services-should-have-multiple-environments":{"ref":"index.html#services-should-have-multiple-environments","tf":0.017241379310344827}}}},"n":{"docs":{"index.html#provide-resource-(uu)ids":{"ref":"index.html#provide-resource-(uu)ids","tf":0.022988505747126436}}}},".":{"docs":{},"g":{"docs":{"index.html#require-versioning-headers":{"ref":"index.html#require-versioning-headers","tf":0.017543859649122806},"index.html#accept-serialized-json-in-request-bodies":{"ref":"index.html#accept-serialized-json-in-request-bodies","tf":0.021739130434782608},"index.html#special-action-endpoints":{"ref":"index.html#special-action-endpoints","tf":0.034482758620689655},"index.html#downcase-and-dash-separated-paths":{"ref":"index.html#downcase-and-dash-separated-paths","tf":0.07142857142857142},"index.html#minimize-path-nesting":{"ref":"index.html#minimize-path-nesting","tf":0.021739130434782608},"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.02824858757062147},"index.html#use-utc-times-formatted-in-iso8601":{"ref":"index.html#use-utc-times-formatted-in-iso8601","tf":0.06666666666666667},"index.html#provide-resource-(uu)ids":{"ref":"index.html#provide-resource-(uu)ids","tf":0.022988505747126436},"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.009259259259259259},"index.html#gzip-and-keep-json-minified-in-all-responses":{"ref":"index.html#gzip-and-keep-json-minified-in-all-responses","tf":0.03225806451612903},"index.html#provide-full-resources-where-available":{"ref":"index.html#provide-full-resources-where-available","tf":0.029850746268656716},"index.html#provide-standard-timestamps":{"ref":"index.html#provide-standard-timestamps","tf":0.047619047619047616},"index.html#plan-stability-and-versioning":{"ref":"index.html#plan-stability-and-versioning","tf":0.02127659574468085},"index.html#(todo)-use-_link-for-foreign-key-relations":{"ref":"index.html#(todo)-use-_link-for-foreign-key-relations","tf":0.041666666666666664},"index.html#design-for-failures":{"ref":"index.html#design-for-failures","tf":0.041666666666666664},"index.html#delegate-common-service-needs-to-an-api-gateway":{"ref":"index.html#delegate-common-service-needs-to-an-api-gateway","tf":0.047619047619047616},"index.html#services-should-have-multiple-environments":{"ref":"index.html#services-should-have-multiple-environments","tf":0.017241379310344827}}}},"r":{"docs":{},"r":{"docs":{},"o":{"docs":{},"r":{"docs":{"index.html#provide-human-readable-documentation-via-api-connect":{"ref":"index.html#provide-human-readable-documentation-via-api-connect","tf":0.029411764705882353},"index.html#respond-structured-and-consistent-errors":{"ref":"index.html#respond-structured-and-consistent-errors","tf":2.608108108108108},"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.02824858757062147}}}}}},"m":{"docs":{},"a":{"docs":{},"i":{"docs":{},"l":{"docs":{"index.html#accept-serialized-json-in-request-bodies":{"ref":"index.html#accept-serialized-json-in-request-bodies","tf":0.021739130434782608},"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428},"index.html#gzip-and-keep-json-minified-in-all-responses":{"ref":"index.html#gzip-and-keep-json-minified-in-all-responses","tf":0.016129032258064516},"index.html#(todo)-use-_link-for-foreign-key-relations":{"ref":"index.html#(todo)-use-_link-for-foreign-key-relations","tf":0.013888888888888888}}}}}},"c":{"docs":{},"o":{"docs":{},"s":{"docs":{},"y":{"docs":{},"s":{"docs":{},"t":{"docs":{},"e":{"docs":{},"m":{"docs":{"index.html#follow-naming-conventions":{"ref":"index.html#follow-naming-conventions","tf":0.02702702702702703}}}}}}}}}},"l":{"docs":{},"a":{"docs":{},"s":{"docs":{},"t":{"docs":{},"i":{"docs":{},"c":{"docs":{},"s":{"docs":{},"e":{"docs":{},"a":{"docs":{},"r":{"docs":{},"c":{"docs":{},"h":{"docs":{"index.html#use-consistent-query-parameter-types":{"ref":"index.html#use-consistent-query-parameter-types","tf":0.02702702702702703}}}}}}}}}}}}}},"s":{"docs":{},"p":{"docs":{},"e":{"docs":{},"c":{"docs":{},"i":{"docs":{"index.html#provide-resource-(uu)ids":{"ref":"index.html#provide-resource-(uu)ids","tf":0.011494252873563218}}}}}}},"t":{"docs":{},"c":{"docs":{"index.html#provide-resource-(uu)ids":{"ref":"index.html#provide-resource-(uu)ids","tf":0.011494252873563218},"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.009259259259259259},"index.html#service-has-a-single-responsibility":{"ref":"index.html#service-has-a-single-responsibility","tf":0.027777777777777776},"index.html#services-are-independent":{"ref":"index.html#services-are-independent","tf":0.023809523809523808}}},"a":{"docs":{},"g":{"docs":{"index.html#support-http-cache-headers":{"ref":"index.html#support-http-cache-headers","tf":0.05555555555555555}}}}},"d":{"docs":{},"g":{"docs":{"index.html#separate-concerns":{"ref":"index.html#separate-concerns","tf":0.017857142857142856}}}}},"f":{"docs":{},"o":{"docs":{},"r":{"docs":{},"k":{"docs":{"index.html":{"ref":"index.html","tf":0.04}}},"m":{"docs":{"index.html#accept-serialized-json-in-request-bodies":{"ref":"index.html#accept-serialized-json-in-request-bodies","tf":0.021739130434782608},"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.011299435028248588}},"a":{"docs":{},"t":{"docs":{"index.html":{"ref":"index.html","tf":0.04},"index.html#use-swagger-2.0-to-describe-apis":{"ref":"index.html#use-swagger-2.0-to-describe-apis","tf":0.04},"index.html#provide-human-readable-documentation-via-api-connect":{"ref":"index.html#provide-human-readable-documentation-via-api-connect","tf":0.029411764705882353},"index.html#respond-structured-and-consistent-errors":{"ref":"index.html#respond-structured-and-consistent-errors","tf":0.02702702702702703},"index.html#use-utc-times-formatted-in-iso8601":{"ref":"index.html#use-utc-times-formatted-in-iso8601","tf":2.066666666666667},"index.html#provide-resource-(uu)ids":{"ref":"index.html#provide-resource-(uu)ids","tf":0.011494252873563218},"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.017857142857142856}}}}},"b":{"docs":{},"i":{"docs":{},"d":{"docs":{},"d":{"docs":{},"e":{"docs":{},"n":{"docs":{"index.html#require-https":{"ref":"index.html#require-https","tf":0.014705882352941176},"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294}}}}}}}},"e":{"docs":{},"i":{"docs":{},"g":{"docs":{},"n":{"docs":{"index.html#(todo)-use-_link-for-foreign-key-relations":{"ref":"index.html#(todo)-use-_link-for-foreign-key-relations","tf":1.6805555555555554}}}}}}},"c":{"docs":{},"u":{"docs":{"index.html#separate-concerns":{"ref":"index.html#separate-concerns","tf":0.017857142857142856},"index.html#service-building-guidelines":{"ref":"index.html#service-building-guidelines","tf":0.01818181818181818}},"s":{"docs":{"index.html#goal-of-the-document":{"ref":"index.html#goal-of-the-document","tf":0.02040816326530612},"index.html#service-has-a-single-responsibility":{"ref":"index.html#service-has-a-single-responsibility","tf":0.027777777777777776}}}}},"l":{"docs":{},"l":{"docs":{},"o":{"docs":{},"w":{"docs":{"index.html#goal-of-the-document":{"ref":"index.html#goal-of-the-document","tf":0.02040816326530612},"index.html#(todo)-when-and-how-to-bump-api-version":{"ref":"index.html#(todo)-when-and-how-to-bump-api-version","tf":0.25},"index.html#follow-naming-conventions":{"ref":"index.html#follow-naming-conventions","tf":3.387387387387387},"index.html#service-building-guidelines":{"ref":"index.html#service-building-guidelines","tf":0.01818181818181818}}}}}}},"u":{"docs":{},"t":{"docs":{},"u":{"docs":{},"r":{"docs":{"index.html#require-versioning-headers":{"ref":"index.html#require-versioning-headers","tf":0.017543859649122806}}}}},"l":{"docs":{},"l":{"docs":{"index.html#use-consistent-http-methods":{"ref":"index.html#use-consistent-http-methods","tf":0.011904761904761904},"index.html#provide-full-resources-where-available":{"ref":"index.html#provide-full-resources-where-available","tf":2.544776119402985}},"i":{"docs":{"index.html#use-consistent-http-methods":{"ref":"index.html#use-consistent-http-methods","tf":0.011904761904761904}}}}}},"i":{"docs":{"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428}},"g":{"docs":{},"u":{"docs":{},"r":{"docs":{"index.html#require-https":{"ref":"index.html#require-https","tf":0.014705882352941176}}}}},"r":{"docs":{},"s":{"docs":{},"t":{"docs":{"index.html#require-https":{"ref":"index.html#require-https","tf":0.014705882352941176},"index.html#service-has-a-single-responsibility":{"ref":"index.html#service-has-a-single-responsibility","tf":0.027777777777777776}}}}},"n":{"docs":{},"i":{"docs":{},"s":{"docs":{},"h":{"docs":{},"e":{"docs":{},"d":{"docs":{},"a":{"docs":{},"t":{"docs":{"index.html#use-utc-times-formatted-in-iso8601":{"ref":"index.html#use-utc-times-formatted-in-iso8601","tf":0.06666666666666667}}}}}}}}}},"e":{"docs":{},"l":{"docs":{},"d":{"docs":{"index.html#(todo)-use-_link-for-foreign-key-relations":{"ref":"index.html#(todo)-use-_link-for-foreign-key-relations","tf":0.013888888888888888}}}}},"t":{"docs":{"index.html#service-building-guidelines":{"ref":"index.html#service-building-guidelines","tf":0.01818181818181818}}},"x":{"docs":{"index.html#services-are-independent":{"ref":"index.html#services-are-independent","tf":0.023809523809523808},"index.html#services-should-have-multiple-environments":{"ref":"index.html#services-should-have-multiple-environments","tf":0.017241379310344827}}}},"l":{"docs":{},"o":{"docs":{},"a":{"docs":{},"t":{"docs":{"index.html#use-json-naming-conventions":{"ref":"index.html#use-json-naming-conventions","tf":0.014285714285714285}}}}},"e":{"docs":{},"x":{"docs":{},"i":{"docs":{},"b":{"docs":{},"l":{"docs":{"index.html#separate-concerns":{"ref":"index.html#separate-concerns","tf":0.017857142857142856}}}}}}},"a":{"docs":{},"g":{"docs":{"index.html#plan-stability-and-versioning":{"ref":"index.html#plan-stability-and-versioning","tf":0.02127659574468085}}}}},"a":{"docs":{},"i":{"docs":{},"l":{"docs":{"index.html#respond-structured-and-consistent-errors":{"ref":"index.html#respond-structured-and-consistent-errors","tf":0.02702702702702703},"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.011299435028248588}},"u":{"docs":{},"r":{"docs":{"index.html#design-for-failures":{"ref":"index.html#design-for-failures","tf":5.041666666666667}}}}}},"s":{"docs":{},"t":{"docs":{"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.009259259259259259}}}},"l":{"docs":{},"s":{"docs":{"index.html#gzip-and-keep-json-minified-in-all-responses":{"ref":"index.html#gzip-and-keep-json-minified-in-all-responses","tf":0.016129032258064516}}}}},"r":{"docs":{},"a":{"docs":{},"m":{"docs":{},"e":{"docs":{},"w":{"docs":{},"o":{"docs":{},"r":{"docs":{},"k":{"docs":{"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.009259259259259259}}}}}}}}},"e":{"docs":{},"e":{"docs":{"index.html#service-building-guidelines":{"ref":"index.html#service-building-guidelines","tf":0.01818181818181818}}}}},"e":{"docs":{},"a":{"docs":{},"t":{"docs":{},"u":{"docs":{},"r":{"docs":{"index.html#services-should-have-multiple-environments":{"ref":"index.html#services-should-have-multiple-environments","tf":0.017241379310344827}}}}}}}},"g":{"docs":{},"i":{"docs":{},"t":{"docs":{},"b":{"docs":{},"o":{"docs":{},"o":{"docs":{},"k":{"docs":{"index.html":{"ref":"index.html","tf":0.04}}}}}},"h":{"docs":{},"u":{"docs":{},"b":{"docs":{"index.html#design-for-failures":{"ref":"index.html#design-for-failures","tf":0.041666666666666664}}}}}},"v":{"docs":{},"e":{"docs":{"index.html#provide-resource-(uu)ids":{"ref":"index.html#provide-resource-(uu)ids","tf":0.011494252873563218},"index.html#delegate-common-service-needs-to-an-api-gateway":{"ref":"index.html#delegate-common-service-needs-to-an-api-gateway","tf":0.047619047619047616}},"n":{"docs":{"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294}}}}}},"u":{"docs":{},"i":{"docs":{},"d":{"docs":{"index.html":{"ref":"index.html","tf":0.04},"index.html#goal-of-the-document":{"ref":"index.html#goal-of-the-document","tf":0.02040816326530612},"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294},"index.html#service-building-guidelines":{"ref":"index.html#service-building-guidelines","tf":0.01818181818181818}},"e":{"docs":{},"l":{"docs":{},"i":{"docs":{},"n":{"docs":{"index.html#require-versioning-headers":{"ref":"index.html#require-versioning-headers","tf":0.017543859649122806},"index.html#(todo)-when-and-how-to-bump-api-version":{"ref":"index.html#(todo)-when-and-how-to-bump-api-version","tf":0.25},"index.html#service-building-guidelines":{"ref":"index.html#service-building-guidelines","tf":3.333333333333333}}}}}},"a":{"docs":{},"n":{"docs":{},"c":{"docs":{"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294}}}}}}}},"o":{"docs":{"index.html#use-swagger-2.0-to-describe-apis":{"ref":"index.html#use-swagger-2.0-to-describe-apis","tf":0.04},"index.html#service-building-guidelines":{"ref":"index.html#service-building-guidelines","tf":0.01818181818181818}},"a":{"docs":{},"l":{"docs":{"index.html#goal-of-the-document":{"ref":"index.html#goal-of-the-document","tf":5.020408163265306}}}},"o":{"docs":{},"d":{"docs":{"index.html#goal-of-the-document":{"ref":"index.html#goal-of-the-document","tf":0.04081632653061224},"index.html#use-consistent-http-methods":{"ref":"index.html#use-consistent-http-methods","tf":0.011904761904761904},"index.html#use-json-naming-conventions":{"ref":"index.html#use-json-naming-conventions","tf":0.014285714285714285},"index.html#use-consistent-query-parameter-types":{"ref":"index.html#use-consistent-query-parameter-types","tf":0.02702702702702703},"index.html#provide-resource-(uu)ids":{"ref":"index.html#provide-resource-(uu)ids","tf":0.011494252873563218},"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.009259259259259259},"index.html#service-building-guidelines":{"ref":"index.html#service-building-guidelines","tf":0.03636363636363636},"index.html#services-should-have-multiple-environments":{"ref":"index.html#services-should-have-multiple-environments","tf":0.017241379310344827}}},"g":{"docs":{},"l":{"docs":{"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428}}}}}},"a":{"docs":{},"i":{"docs":{},"n":{"docs":{"index.html#require-https":{"ref":"index.html#require-https","tf":0.014705882352941176},"index.html#service-building-guidelines":{"ref":"index.html#service-building-guidelines","tf":0.01818181818181818}}}},"t":{"docs":{},"e":{"docs":{},"w":{"docs":{},"a":{"docs":{},"y":{"docs":{"index.html#delegate-common-service-needs-to-an-api-gateway":{"ref":"index.html#delegate-common-service-needs-to-an-api-gateway","tf":1.6666666666666665}}}}}}}},"e":{"docs":{},"n":{"docs":{},"e":{"docs":{},"r":{"docs":{"index.html#use-swagger-2.0-to-describe-apis":{"ref":"index.html#use-swagger-2.0-to-describe-apis","tf":0.04},"index.html#respond-structured-and-consistent-errors":{"ref":"index.html#respond-structured-and-consistent-errors","tf":0.02702702702702703},"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.009259259259259259}}}}}},"l":{"docs":{},"o":{"docs":{},"b":{"docs":{},"a":{"docs":{},"l":{"docs":{"index.html#provide-resource-(uu)ids":{"ref":"index.html#provide-resource-(uu)ids","tf":0.022988505747126436}}}}}}},"r":{"docs":{},"e":{"docs":{},"a":{"docs":{},"t":{"docs":{},"e":{"docs":{},"r":{"docs":{"index.html#separate-concerns":{"ref":"index.html#separate-concerns","tf":0.017857142857142856}}}}}}},"a":{"docs":{},"p":{"docs":{},"h":{"docs":{"index.html#service-has-a-single-responsibility":{"ref":"index.html#service-has-a-single-responsibility","tf":0.05555555555555555}}}}}},"z":{"docs":{},"i":{"docs":{},"p":{"docs":{"index.html#gzip-and-keep-json-minified-in-all-responses":{"ref":"index.html#gzip-and-keep-json-minified-in-all-responses","tf":2.0161290322580645}}}}},"w":{"docs":{"index.html#delegate-common-service-needs-to-an-api-gateway":{"ref":"index.html#delegate-common-service-needs-to-an-api-gateway","tf":0.047619047619047616}}}},"h":{"docs":{"index.html#accept-serialized-json-in-request-bodies":{"ref":"index.html#accept-serialized-json-in-request-bodies","tf":0.021739130434782608}},"e":{"docs":{},"r":{"docs":{},"o":{"docs":{},"k":{"docs":{},"u":{"docs":{"index.html":{"ref":"index.html","tf":0.04},"index.html#divide-large-responses-across-requests-with-ranges":{"ref":"index.html#divide-large-responses-across-requests-with-ranges","tf":0.03571428571428571},"index.html#plan-stability-and-versioning":{"ref":"index.html#plan-stability-and-versioning","tf":0.02127659574468085}}}}},"e":{"docs":{"index.html#goal-of-the-document":{"ref":"index.html#goal-of-the-document","tf":0.02040816326530612},"index.html#separate-concerns":{"ref":"index.html#separate-concerns","tf":0.017857142857142856}}}},"a":{"docs":{},"d":{"docs":{"index.html#use-consistent-http-methods":{"ref":"index.html#use-consistent-http-methods","tf":0.011904761904761904}},"e":{"docs":{},"r":{"docs":{"index.html#require-versioning-headers":{"ref":"index.html#require-versioning-headers","tf":3.3684210526315788},"index.html#provide-human-readable-documentation-via-api-connect":{"ref":"index.html#provide-human-readable-documentation-via-api-connect","tf":0.029411764705882353},"index.html#use-consistent-http-methods":{"ref":"index.html#use-consistent-http-methods","tf":0.011904761904761904},"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294},"index.html#separate-concerns":{"ref":"index.html#separate-concerns","tf":0.05357142857142857},"index.html#divide-large-responses-across-requests-with-ranges":{"ref":"index.html#divide-large-responses-across-requests-with-ranges","tf":0.07142857142857142},"index.html#provide-request-ids-for-introspection":{"ref":"index.html#provide-request-ids-for-introspection","tf":0.045454545454545456},"index.html#support-http-cache-headers":{"ref":"index.html#support-http-cache-headers","tf":2.5833333333333335}}}}},"v":{"docs":{},"i":{"docs":{"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":1.6666666666666665},"index.html#service-has-a-single-responsibility":{"ref":"index.html#service-has-a-single-responsibility","tf":0.027777777777777776}}}}},"l":{"docs":{},"p":{"docs":{"index.html#service-building-guidelines":{"ref":"index.html#service-building-guidelines","tf":0.01818181818181818},"index.html#services-should-have-multiple-environments":{"ref":"index.html#services-should-have-multiple-environments","tf":0.017241379310344827}}}}},"t":{"docs":{},"t":{"docs":{},"p":{"docs":{"index.html":{"ref":"index.html","tf":3.25},"index.html#goal-of-the-document":{"ref":"index.html#goal-of-the-document","tf":0.75},"index.html#services-must":{"ref":"index.html#services-must","tf":0.75},"index.html#provide-certain-mandatory-artifactsactions":{"ref":"index.html#provide-certain-mandatory-artifactsactions","tf":0.75},"index.html#(todo)-implement-authentication-with-openid-connect":{"ref":"index.html#(todo)-implement-authentication-with-openid-connect","tf":0.75},"index.html#require-versioning-headers":{"ref":"index.html#require-versioning-headers","tf":0.75},"index.html#(todo)-when-and-how-to-bump-api-version":{"ref":"index.html#(todo)-when-and-how-to-bump-api-version","tf":0.75},"index.html#require-https":{"ref":"index.html#require-https","tf":5.764705882352941},"index.html#use-swagger-2.0-to-describe-apis":{"ref":"index.html#use-swagger-2.0-to-describe-apis","tf":0.79},"index.html#provide-human-readable-documentation-via-api-connect":{"ref":"index.html#provide-human-readable-documentation-via-api-connect","tf":0.75},"index.html#accept-serialized-json-in-request-bodies":{"ref":"index.html#accept-serialized-json-in-request-bodies","tf":0.75},"index.html#use-consistent-http-methods":{"ref":"index.html#use-consistent-http-methods","tf":3.261904761904762},"index.html#special-action-endpoints":{"ref":"index.html#special-action-endpoints","tf":0.75},"index.html#follow-naming-conventions":{"ref":"index.html#follow-naming-conventions","tf":0.75},"index.html#use-json-naming-conventions":{"ref":"index.html#use-json-naming-conventions","tf":0.75},"index.html#downcase-and-dash-separated-paths":{"ref":"index.html#downcase-and-dash-separated-paths","tf":0.75},"index.html#camelcase-query-parameters":{"ref":"index.html#camelcase-query-parameters","tf":0.75},"index.html#use-consistent-query-parameter-types":{"ref":"index.html#use-consistent-query-parameter-types","tf":0.75},"index.html#minimize-path-nesting":{"ref":"index.html#minimize-path-nesting","tf":0.75},"index.html#resource-names":{"ref":"index.html#resource-names","tf":0.75},"index.html#respond-structured-and-consistent-errors":{"ref":"index.html#respond-structured-and-consistent-errors","tf":0.75},"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.7612994350282486},"index.html#use-utc-times-formatted-in-iso8601":{"ref":"index.html#use-utc-times-formatted-in-iso8601","tf":0.75},"index.html#provide-resource-(uu)ids":{"ref":"index.html#provide-resource-(uu)ids","tf":0.75},"index.html#services-should":{"ref":"index.html#services-should","tf":0.75},"index.html#separate-concerns":{"ref":"index.html#separate-concerns","tf":0.75},"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.7777777777777778},"index.html#divide-large-responses-across-requests-with-ranges":{"ref":"index.html#divide-large-responses-across-requests-with-ranges","tf":0.75},"index.html#provide-request-ids-for-introspection":{"ref":"index.html#provide-request-ids-for-introspection","tf":0.75},"index.html#support-http-cache-headers":{"ref":"index.html#support-http-cache-headers","tf":3.2777777777777777},"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.75},"index.html#gzip-and-keep-json-minified-in-all-responses":{"ref":"index.html#gzip-and-keep-json-minified-in-all-responses","tf":0.75},"index.html#provide-full-resources-where-available":{"ref":"index.html#provide-full-resources-where-available","tf":0.75},"index.html#provide-standard-timestamps":{"ref":"index.html#provide-standard-timestamps","tf":0.75},"index.html#plan-stability-and-versioning":{"ref":"index.html#plan-stability-and-versioning","tf":0.75},"index.html#(todo)-use-_link-for-foreign-key-relations":{"ref":"index.html#(todo)-use-_link-for-foreign-key-relations","tf":0.75},"index.html#service-building-guidelines":{"ref":"index.html#service-building-guidelines","tf":0.75},"index.html#service-has-a-single-responsibility":{"ref":"index.html#service-has-a-single-responsibility","tf":0.75},"index.html#services-are-independent":{"ref":"index.html#services-are-independent","tf":0.75},"index.html#design-for-failures":{"ref":"index.html#design-for-failures","tf":0.7916666666666666},"index.html#delegate-common-service-needs-to-an-api-gateway":{"ref":"index.html#delegate-common-service-needs-to-an-api-gateway","tf":0.75},"index.html#services-should-have-multiple-environments":{"ref":"index.html#services-should-have-multiple-environments","tf":0.75}},"s":{"docs":{},":":{"docs":{},"/":{"docs":{},"/":{"docs":{},"g":{"docs":{},"i":{"docs":{},"t":{"docs":{},"h":{"docs":{},"u":{"docs":{},"b":{"docs":{},".":{"docs":{},"c":{"docs":{},"o":{"docs":{},"m":{"docs":{},"/":{"docs":{},"i":{"docs":{},"n":{"docs":{},"t":{"docs":{},"e":{"docs":{},"r":{"docs":{},"a":{"docs":{},"g":{"docs":{},"e":{"docs":{},"n":{"docs":{},"t":{"docs":{},"/":{"docs":{},"h":{"docs":{},"t":{"docs":{},"t":{"docs":{},"p":{"docs":{"index.html":{"ref":"index.html","tf":0.04}}}}}}}}}}}}}}}}}}}}}}}}}}}},"w":{"docs":{},"w":{"docs":{},"w":{"docs":{},".":{"docs":{},"i":{"docs":{},"b":{"docs":{},"m":{"docs":{},".":{"docs":{},"c":{"docs":{},"o":{"docs":{},"m":{"docs":{},"/":{"docs":{},"s":{"docs":{},"u":{"docs":{},"p":{"docs":{},"p":{"docs":{},"o":{"docs":{},"r":{"docs":{},"t":{"docs":{},"/":{"docs":{},"k":{"docs":{},"n":{"docs":{},"o":{"docs":{},"w":{"docs":{},"l":{"docs":{},"e":{"docs":{},"d":{"docs":{},"g":{"docs":{},"e":{"docs":{},"c":{"docs":{},"e":{"docs":{},"n":{"docs":{},"t":{"docs":{},"e":{"docs":{},"r":{"docs":{},"/":{"docs":{},"s":{"docs":{},"s":{"docs":{},"w":{"docs":{},"h":{"docs":{},"y":{"docs":{},"p":{"docs":{},"_":{"4":{"docs":{},".":{"0":{"docs":{},".":{"0":{"docs":{},"/":{"docs":{},"c":{"docs":{},"o":{"docs":{},"m":{"docs":{},".":{"docs":{},"i":{"docs":{},"b":{"docs":{},"m":{"docs":{},".":{"docs":{},"a":{"docs":{},"p":{"docs":{},"i":{"docs":{},"m":{"docs":{},"g":{"docs":{},"m":{"docs":{},"t":{"docs":{},".":{"docs":{},"a":{"docs":{},"p":{"docs":{},"i":{"docs":{},"o":{"docs":{},"n":{"docs":{},"p":{"docs":{},"r":{"docs":{},"e":{"docs":{},"m":{"docs":{},".":{"docs":{},"d":{"docs":{},"o":{"docs":{},"c":{"docs":{},"/":{"docs":{},"t":{"docs":{},"u":{"docs":{},"t":{"docs":{},"o":{"docs":{},"r":{"docs":{},"i":{"docs":{},"a":{"docs":{},"l":{"docs":{},"_":{"docs":{},"a":{"docs":{},"p":{"docs":{},"i":{"docs":{},"o":{"docs":{},"n":{"docs":{},"p":{"docs":{},"r":{"docs":{},"e":{"docs":{},"m":{"docs":{},"_":{"docs":{},"s":{"docs":{},"e":{"docs":{},"c":{"docs":{},"u":{"docs":{},"r":{"docs":{},"i":{"docs":{},"t":{"docs":{},"y":{"docs":{},"_":{"docs":{},"o":{"docs":{},"a":{"docs":{},"u":{"docs":{},"t":{"docs":{},"h":{"docs":{},".":{"docs":{},"h":{"docs":{},"t":{"docs":{},"m":{"docs":{},"l":{"docs":{"index.html#(todo)-implement-authentication-with-openid-connect":{"ref":"index.html#(todo)-implement-authentication-with-openid-connect","tf":1}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}},"docs":{}}},"docs":{}}},"docs":{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}},"n":{"docs":{},"g":{"docs":{},"i":{"docs":{},"n":{"docs":{},"x":{"docs":{},".":{"docs":{},"c":{"docs":{},"o":{"docs":{},"m":{"docs":{},"/":{"docs":{},"b":{"docs":{},"l":{"docs":{},"o":{"docs":{},"g":{"docs":{},"/":{"docs":{},"m":{"docs":{},"i":{"docs":{},"c":{"docs":{},"r":{"docs":{},"o":{"docs":{},"s":{"docs":{},"e":{"docs":{},"r":{"docs":{},"v":{"docs":{},"i":{"docs":{},"c":{"docs":{"index.html#service-building-guidelines":{"ref":"index.html#service-building-guidelines","tf":0.01818181818181818}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}},"s":{"docs":{},"e":{"docs":{},"r":{"docs":{},"v":{"docs":{},"i":{"docs":{},"c":{"docs":{},"e":{"docs":{},".":{"docs":{},"c":{"docs":{},"o":{"docs":{},"m":{"docs":{},"/":{"docs":{},"a":{"docs":{},"p":{"docs":{},"p":{"docs":{"index.html#accept-serialized-json-in-request-bodies":{"ref":"index.html#accept-serialized-json-in-request-bodies","tf":0.021739130434782608}},"s":{"docs":{},"/":{"1":{"docs":{},"f":{"9":{"docs":{},"b":{"docs":{},"/":{"docs":{},"d":{"docs":{},"o":{"docs":{},"m":{"docs":{},"a":{"docs":{},"i":{"docs":{},"n":{"docs":{},"s":{"docs":{},"/":{"0":{"docs":{},"f":{"docs":{},"d":{"4":{"docs":{"index.html#provide-full-resources-where-available":{"ref":"index.html#provide-full-resources-where-available","tf":0.014925373134328358}}},"docs":{}}}},"docs":{}}}}}}}},"y":{"docs":{},"n":{"docs":{},"o":{"docs":{},"s":{"docs":{},"/":{"0":{"5":{"docs":{},"b":{"docs":{},"d":{"docs":{"index.html#provide-full-resources-where-available":{"ref":"index.html#provide-full-resources-where-available","tf":0.014925373134328358}}}}},"docs":{}},"docs":{}}}}}}}}}},"docs":{}}},"docs":{}}}}}}}}}}}}}}}}},"c":{"docs":{},"h":{"docs":{},"e":{"docs":{},"m":{"docs":{},"a":{"docs":{},".":{"docs":{},"o":{"docs":{},"r":{"docs":{},"g":{"docs":{"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428}}}}}}}}}}}},"k":{"docs":{},"e":{"docs":{},"s":{"docs":{},"k":{"docs":{},"o":{"docs":{},"a":{"docs":{},"p":{"docs":{},"i":{"docs":{},".":{"docs":{},"c":{"docs":{},"o":{"docs":{},"m":{"docs":{},"/":{"docs":{},"a":{"docs":{},"p":{"docs":{},"i":{"docs":{},"/":{"docs":{},"u":{"docs":{},"s":{"docs":{},"e":{"docs":{},"r":{"docs":{},"s":{"docs":{},"/":{"0":{"1":{"2":{"3":{"4":{"5":{"6":{"7":{"docs":{"index.html#(todo)-use-_link-for-foreign-key-relations":{"ref":"index.html#(todo)-use-_link-for-foreign-key-relations","tf":0.013888888888888888}}},"docs":{}},"docs":{}},"docs":{}},"docs":{}},"docs":{}},"docs":{}},"docs":{}},"1":{"2":{"3":{"docs":{},"e":{"4":{"5":{"6":{"7":{"docs":{"index.html#use-json-naming-conventions":{"ref":"index.html#use-json-naming-conventions","tf":0.02857142857142857}}},"docs":{}},"docs":{}},"docs":{}},"docs":{}}},"docs":{}},"docs":{}},"docs":{}}}}}}},"p":{"docs":{},"r":{"docs":{},"o":{"docs":{},"d":{"docs":{},"u":{"docs":{},"c":{"docs":{},"t":{"docs":{},"s":{"docs":{},"/":{"docs":{},"p":{"docs":{},"k":{"0":{"3":{"5":{"docs":{"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428}}},"docs":{}},"docs":{}},"docs":{}}}}}}}}}}}}}}}}}}}}}}}}}}}}},"d":{"docs":{},"e":{"docs":{},"v":{"docs":{},"c":{"docs":{},"e":{"docs":{},"n":{"docs":{},"t":{"docs":{},"e":{"docs":{},"r":{"docs":{},".":{"docs":{},"h":{"docs":{},"e":{"docs":{},"r":{"docs":{},"o":{"docs":{},"k":{"docs":{},"u":{"docs":{},".":{"docs":{},"c":{"docs":{},"o":{"docs":{},"m":{"docs":{},"/":{"docs":{},"a":{"docs":{},"r":{"docs":{},"t":{"docs":{},"i":{"docs":{},"c":{"docs":{},"l":{"docs":{},"e":{"docs":{},"s":{"docs":{},"/":{"docs":{},"b":{"docs":{},"a":{"docs":{},"c":{"docs":{},"k":{"docs":{},"g":{"docs":{},"r":{"docs":{},"o":{"docs":{},"u":{"docs":{},"n":{"docs":{},"d":{"docs":{"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.009259259259259259}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}},"m":{"docs":{},"e":{"docs":{},"d":{"docs":{},"i":{"docs":{},"u":{"docs":{},"m":{"docs":{},".":{"docs":{},"c":{"docs":{},"o":{"docs":{},"m":{"docs":{},"/":{"docs":{},"w":{"docs":{},"s":{"docs":{},"o":{"2":{"docs":{"index.html#service-building-guidelines":{"ref":"index.html#service-building-guidelines","tf":0.01818181818181818}}},"docs":{}}}}}}}}}}}}}}}}}}},"/":{"1":{"docs":{},".":{"1":{"docs":{"index.html#respond-structured-and-consistent-errors":{"ref":"index.html#respond-structured-and-consistent-errors","tf":0.02702702702702703},"index.html#provide-full-resources-where-available":{"ref":"index.html#provide-full-resources-where-available","tf":0.029850746268656716}}},"docs":{}}},"docs":{}},":":{"docs":{},"/":{"docs":{},"/":{"docs":{},"j":{"docs":{},"s":{"docs":{},"o":{"docs":{},"n":{"docs":{"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428}}}}}},"s":{"docs":{},"c":{"docs":{},"h":{"docs":{},"e":{"docs":{},"m":{"docs":{},"a":{"docs":{},".":{"docs":{},"o":{"docs":{},"r":{"docs":{},"g":{"docs":{"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428}}}}}}}}}}}},"h":{"docs":{},"i":{"docs":{},"g":{"docs":{},"h":{"docs":{},"s":{"docs":{},"c":{"docs":{},"a":{"docs":{},"l":{"docs":{},"a":{"docs":{},"b":{"docs":{},"i":{"docs":{},"l":{"docs":{},"i":{"docs":{},"t":{"docs":{},"y":{"docs":{},".":{"docs":{},"c":{"docs":{},"o":{"docs":{},"m":{"docs":{},"/":{"docs":{},"b":{"docs":{},"l":{"docs":{},"o":{"docs":{},"g":{"docs":{},"/":{"2":{"0":{"1":{"4":{"docs":{},"/":{"4":{"docs":{},"/":{"8":{"docs":{},"/":{"docs":{},"m":{"docs":{},"i":{"docs":{},"c":{"docs":{},"r":{"docs":{},"o":{"docs":{},"s":{"docs":{},"e":{"docs":{},"r":{"docs":{},"v":{"docs":{},"i":{"docs":{},"c":{"docs":{"index.html#service-building-guidelines":{"ref":"index.html#service-building-guidelines","tf":0.01818181818181818}}}}}}}}}}}}}}},"docs":{}}},"docs":{}}},"docs":{}},"docs":{}},"docs":{}},"docs":{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}},"u":{"docs":{},"n":{"docs":{},"d":{"docs":{},"r":{"docs":{"index.html#goal-of-the-document":{"ref":"index.html#goal-of-the-document","tf":0.02040816326530612}}}}},"m":{"docs":{},"a":{"docs":{},"n":{"docs":{"index.html#provide-human-readable-documentation-via-api-connect":{"ref":"index.html#provide-human-readable-documentation-via-api-connect","tf":1.4285714285714284},"index.html#respond-structured-and-consistent-errors":{"ref":"index.html#respond-structured-and-consistent-errors","tf":0.02702702702702703},"index.html#gzip-and-keep-json-minified-in-all-responses":{"ref":"index.html#gzip-and-keep-json-minified-in-all-responses","tf":0.016129032258064516}}}}}},"i":{"docs":{},"b":{"docs":{},"e":{"docs":{},"r":{"docs":{},"n":{"docs":{"index.html#use-consistent-http-methods":{"ref":"index.html#use-consistent-http-methods","tf":0.011904761904761904}}}}}},"e":{"docs":{},"r":{"docs":{},"a":{"docs":{},"r":{"docs":{},"c":{"docs":{},"h":{"docs":{"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428}}}}}}}}},"o":{"docs":{},"s":{"docs":{},"t":{"docs":{},"n":{"docs":{},"a":{"docs":{},"m":{"docs":{"index.html#downcase-and-dash-separated-paths":{"ref":"index.html#downcase-and-dash-separated-paths","tf":0.07142857142857142},"index.html#provide-full-resources-where-available":{"ref":"index.html#provide-full-resources-where-available","tf":0.014925373134328358}}}}}}},"r":{"docs":{},"i":{"docs":{},"z":{"docs":{},"o":{"docs":{},"n":{"docs":{},"t":{"docs":{"index.html#design-for-failures":{"ref":"index.html#design-for-failures","tf":0.041666666666666664}}}}}}}}},"a":{"docs":{},"s":{"docs":{},"c":{"docs":{},"o":{"docs":{},"m":{"docs":{},"m":{"docs":{},"e":{"docs":{},"n":{"docs":{},"t":{"docs":{},"=":{"docs":{},"f":{"docs":{},"a":{"docs":{},"l":{"docs":{},"s":{"docs":{},"e":{"docs":{},"&":{"docs":{},"m":{"docs":{},"i":{"docs":{},"n":{"docs":{},"r":{"docs":{},"a":{"docs":{},"t":{"docs":{},"i":{"docs":{},"n":{"docs":{},"g":{"docs":{},"=":{"1":{"docs":{},".":{"2":{"docs":{"index.html#camelcase-query-parameters":{"ref":"index.html#camelcase-query-parameters","tf":0.14285714285714285}}},"docs":{}}},"docs":{}}}}}}}}}}}}}}}}}}}}}}}}},"o":{"docs":{},"f":{"docs":{},"f":{"docs":{},"e":{"docs":{},"r":{"docs":{},"c":{"docs":{},"a":{"docs":{},"t":{"docs":{},"a":{"docs":{},"l":{"docs":{},"o":{"docs":{},"g":{"docs":{"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428}}}}}}}}}}}}}}},"p":{"docs":{},"i":{"docs":{},"j":{"docs":{"index.html#respond-structured-and-consistent-errors":{"ref":"index.html#respond-structured-and-consistent-errors","tf":0.02702702702702703}}}}},"r":{"docs":{},"d":{"docs":{},"e":{"docs":{},"r":{"docs":{"index.html#separate-concerns":{"ref":"index.html#separate-concerns","tf":0.017857142857142856}}}},"w":{"docs":{},"a":{"docs":{},"r":{"docs":{},"e":{"docs":{},"s":{"docs":{},"t":{"docs":{},"o":{"docs":{},"r":{"docs":{"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428}}}}}}}}}}}},"v":{"docs":{},"e":{"docs":{"index.html#(todo)-use-_link-for-foreign-key-relations":{"ref":"index.html#(todo)-use-_link-for-foreign-key-relations","tf":0.013888888888888888}}}}}},"i":{"docs":{},"n":{"docs":{},"s":{"docs":{},"t":{"docs":{},"e":{"docs":{},"a":{"docs":{},"d":{"docs":{"index.html":{"ref":"index.html","tf":0.04},"index.html#accept-serialized-json-in-request-bodies":{"ref":"index.html#accept-serialized-json-in-request-bodies","tf":0.021739130434782608},"index.html#gzip-and-keep-json-minified-in-all-responses":{"ref":"index.html#gzip-and-keep-json-minified-in-all-responses","tf":0.016129032258064516},"index.html#(todo)-use-_link-for-foreign-key-relations":{"ref":"index.html#(todo)-use-_link-for-foreign-key-relations","tf":0.027777777777777776},"index.html#service-building-guidelines":{"ref":"index.html#service-building-guidelines","tf":0.01818181818181818}}}}},"a":{"docs":{},"n":{"docs":{},"c":{"docs":{"index.html#provide-resource-(uu)ids":{"ref":"index.html#provide-resource-(uu)ids","tf":0.011494252873563218}}}}}},"e":{"docs":{},"c":{"docs":{},"u":{"docs":{},"r":{"docs":{"index.html#require-https":{"ref":"index.html#require-https","tf":0.014705882352941176}}}}}},"i":{"docs":{},"g":{"docs":{},"h":{"docs":{},"t":{"docs":{},"/":{"docs":{},"g":{"docs":{},"u":{"docs":{},"i":{"docs":{},"d":{"docs":{},"e":{"docs":{},"l":{"docs":{},"i":{"docs":{},"n":{"docs":{"index.html#service-building-guidelines":{"ref":"index.html#service-building-guidelines","tf":0.01818181818181818}}}}}}}}}}}}}}}},"d":{"docs":{},"i":{"docs":{},"v":{"docs":{},"i":{"docs":{},"d":{"docs":{},"u":{"docs":{"index.html#goal-of-the-document":{"ref":"index.html#goal-of-the-document","tf":0.02040816326530612},"index.html#special-action-endpoints":{"ref":"index.html#special-action-endpoints","tf":0.034482758620689655}}}}}},"c":{"docs":{"index.html#minimize-path-nesting":{"ref":"index.html#minimize-path-nesting","tf":0.021739130434782608},"index.html#separate-concerns":{"ref":"index.html#separate-concerns","tf":0.017857142857142856}}}},"e":{"docs":{},"p":{"docs":{},"e":{"docs":{},"n":{"docs":{},"d":{"docs":{"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.018518518518518517},"index.html#services-are-independent":{"ref":"index.html#services-are-independent","tf":5.0476190476190474}}}}}}}},"f":{"docs":{},"o":{"docs":{"index.html#use-consistent-http-methods":{"ref":"index.html#use-consistent-http-methods","tf":0.011904761904761904}},"r":{"docs":{},"m":{"docs":{"index.html#provide-certain-mandatory-artifactsactions":{"ref":"index.html#provide-certain-mandatory-artifactsactions","tf":0.018867924528301886},"index.html#provide-human-readable-documentation-via-api-connect":{"ref":"index.html#provide-human-readable-documentation-via-api-connect","tf":0.029411764705882353},"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294},"index.html#separate-concerns":{"ref":"index.html#separate-concerns","tf":0.03571428571428571},"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.009259259259259259},"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428},"index.html#(todo)-use-_link-for-foreign-key-relations":{"ref":"index.html#(todo)-use-_link-for-foreign-key-relations","tf":0.013888888888888888}}}}}},"c":{"docs":{},"l":{"docs":{},"u":{"docs":{},"d":{"docs":{"index.html#provide-human-readable-documentation-via-api-connect":{"ref":"index.html#provide-human-readable-documentation-via-api-connect","tf":0.029411764705882353},"index.html#respond-structured-and-consistent-errors":{"ref":"index.html#respond-structured-and-consistent-errors","tf":0.02702702702702703},"index.html#provide-request-ids-for-introspection":{"ref":"index.html#provide-request-ids-for-introspection","tf":0.045454545454545456},"index.html#provide-full-resources-where-available":{"ref":"index.html#provide-full-resources-where-available","tf":0.029850746268656716}}}}},"o":{"docs":{},"r":{"docs":{},"r":{"docs":{},"e":{"docs":{},"c":{"docs":{},"t":{"docs":{},"l":{"docs":{},"i":{"docs":{"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294}}}}}}}}},"m":{"docs":{},"p":{"docs":{},"a":{"docs":{},"t":{"docs":{"index.html#plan-stability-and-versioning":{"ref":"index.html#plan-stability-and-versioning","tf":0.0425531914893617}}}}}}},"r":{"docs":{},"e":{"docs":{},"m":{"docs":{},"e":{"docs":{},"n":{"docs":{},"t":{"docs":{"index.html#provide-resource-(uu)ids":{"ref":"index.html#provide-resource-(uu)ids","tf":0.011494252873563218},"index.html#plan-stability-and-versioning":{"ref":"index.html#plan-stability-and-versioning","tf":0.02127659574468085}}}}}},"a":{"docs":{},"s":{"docs":{"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.009259259259259259}}}}}},"i":{"docs":{},"d":{"docs":{"index.html#services-are-independent":{"ref":"index.html#services-are-independent","tf":0.023809523809523808}}}}},"t":{"docs":{},"r":{"docs":{},"o":{"docs":{},"d":{"docs":{},"u":{"docs":{},"c":{"docs":{"index.html#follow-naming-conventions":{"ref":"index.html#follow-naming-conventions","tf":0.02702702702702703},"index.html#(todo)-use-_link-for-foreign-key-relations":{"ref":"index.html#(todo)-use-_link-for-foreign-key-relations","tf":0.013888888888888888}}}}},"s":{"docs":{},"p":{"docs":{},"e":{"docs":{},"c":{"docs":{},"t":{"docs":{"index.html#provide-request-ids-for-introspection":{"ref":"index.html#provide-request-ids-for-introspection","tf":2.5}}}}}}}}},"e":{"docs":{},"r":{"docs":{},"n":{"docs":{"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294},"index.html#provide-resource-(uu)ids":{"ref":"index.html#provide-resource-(uu)ids","tf":0.011494252873563218}}}},"g":{"docs":{},"r":{"docs":{"index.html#design-for-failures":{"ref":"index.html#design-for-failures","tf":0.041666666666666664}}}}}},"v":{"docs":{},"a":{"docs":{},"l":{"docs":{},"i":{"docs":{},"d":{"docs":{"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.011299435028248588}}}}}}},"l":{"docs":{},"i":{"docs":{},"n":{"docs":{"index.html#(todo)-use-_link-for-foreign-key-relations":{"ref":"index.html#(todo)-use-_link-for-foreign-key-relations","tf":0.027777777777777776}}}}}},"b":{"docs":{},"m":{"docs":{"index.html#provide-certain-mandatory-artifactsactions":{"ref":"index.html#provide-certain-mandatory-artifactsactions","tf":0.03773584905660377}}}},"m":{"docs":{},"p":{"docs":{},"l":{"docs":{},"e":{"docs":{},"m":{"docs":{},"e":{"docs":{},"n":{"docs":{},"t":{"docs":{"index.html#(todo)-implement-authentication-with-openid-connect":{"ref":"index.html#(todo)-implement-authentication-with-openid-connect","tf":2}}}}}}}}}},"d":{"docs":{"index.html#accept-serialized-json-in-request-bodies":{"ref":"index.html#accept-serialized-json-in-request-bodies","tf":0.043478260869565216},"index.html#use-consistent-http-methods":{"ref":"index.html#use-consistent-http-methods","tf":0.047619047619047616},"index.html#use-json-naming-conventions":{"ref":"index.html#use-json-naming-conventions","tf":0.04285714285714286},"index.html#provide-resource-(uu)ids":{"ref":"index.html#provide-resource-(uu)ids","tf":0.11494252873563218},"index.html#provide-request-ids-for-introspection":{"ref":"index.html#provide-request-ids-for-introspection","tf":2.5454545454545454},"index.html#gzip-and-keep-json-minified-in-all-responses":{"ref":"index.html#gzip-and-keep-json-minified-in-all-responses","tf":0.016129032258064516},"index.html#provide-full-resources-where-available":{"ref":"index.html#provide-full-resources-where-available","tf":0.014925373134328358},"index.html#(todo)-use-_link-for-foreign-key-relations":{"ref":"index.html#(todo)-use-_link-for-foreign-key-relations","tf":0.027777777777777776}},"e":{"docs":{},"a":{"docs":{},"l":{"docs":{"index.html#require-https":{"ref":"index.html#require-https","tf":0.014705882352941176},"index.html#plan-stability-and-versioning":{"ref":"index.html#plan-stability-and-versioning","tf":0.02127659574468085},"index.html#services-should-have-multiple-environments":{"ref":"index.html#services-should-have-multiple-environments","tf":0.017241379310344827}}}},"n":{"docs":{},"t":{"docs":{"index.html#separate-concerns":{"ref":"index.html#separate-concerns","tf":0.017857142857142856}},"i":{"docs":{},"f":{"docs":{},"i":{"docs":{"index.html#support-http-cache-headers":{"ref":"index.html#support-http-cache-headers","tf":0.027777777777777776}}}}}}}},"=":{"1":{"docs":{},"&":{"docs":{},"i":{"docs":{},"d":{"docs":{},"=":{"2":{"docs":{"index.html#use-consistent-query-parameter-types":{"ref":"index.html#use-consistent-query-parameter-types","tf":0.02702702702702703}}},"docs":{}}}}}},"docs":{}},"s":{"docs":{},"=":{"1":{"docs":{},"&":{"docs":{},"i":{"docs":{},"d":{"docs":{},"s":{"docs":{},"=":{"2":{"docs":{"index.html#use-consistent-query-parameter-types":{"ref":"index.html#use-consistent-query-parameter-types","tf":0.02702702702702703}}},"docs":{}}}}}},",":{"2":{"docs":{"index.html#use-consistent-query-parameter-types":{"ref":"index.html#use-consistent-query-parameter-types","tf":0.02702702702702703}}},"docs":{}}},"docs":{}}}},"t":{"docs":{},"’":{"docs":{"index.html#require-https":{"ref":"index.html#require-https","tf":0.029411764705882353},"index.html#service-building-guidelines":{"ref":"index.html#service-building-guidelines","tf":0.01818181818181818}}},"e":{"docs":{},"r":{"docs":{"index.html#divide-large-responses-across-requests-with-ranges":{"ref":"index.html#divide-large-responses-across-requests-with-ranges","tf":0.03571428571428571}}}}},"s":{"docs":{},"s":{"docs":{},"u":{"docs":{"index.html#use-consistent-http-methods":{"ref":"index.html#use-consistent-http-methods","tf":0.011904761904761904},"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294}}}},"a":{"docs":{},"d":{"docs":{},"m":{"docs":{},"i":{"docs":{},"n":{"docs":{},"=":{"docs":{},"t":{"docs":{},"r":{"docs":{},"u":{"docs":{"index.html#camelcase-query-parameters":{"ref":"index.html#camelcase-query-parameters","tf":0.14285714285714285}}}}}}}}}}},"o":{"8":{"6":{"0":{"1":{"docs":{"index.html#use-utc-times-formatted-in-iso8601":{"ref":"index.html#use-utc-times-formatted-in-iso8601","tf":2.066666666666667}}},"docs":{}},"docs":{}},"docs":{}},"docs":{}}},"o":{"docs":{"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.009259259259259259}}},"r":{"docs":{},"i":{"docs":{"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428}}}},".":{"docs":{"index.html#provide-full-resources-where-available":{"ref":"index.html#provide-full-resources-where-available","tf":0.014925373134328358}}}},"k":{"docs":{"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.026785714285714284}},"e":{"docs":{},"s":{"docs":{},"k":{"docs":{},"o":{"docs":{"index.html":{"ref":"index.html","tf":3.25},"index.html#goal-of-the-document":{"ref":"index.html#goal-of-the-document","tf":0.75},"index.html#services-must":{"ref":"index.html#services-must","tf":0.75},"index.html#provide-certain-mandatory-artifactsactions":{"ref":"index.html#provide-certain-mandatory-artifactsactions","tf":0.75},"index.html#(todo)-implement-authentication-with-openid-connect":{"ref":"index.html#(todo)-implement-authentication-with-openid-connect","tf":0.75},"index.html#require-versioning-headers":{"ref":"index.html#require-versioning-headers","tf":0.75},"index.html#(todo)-when-and-how-to-bump-api-version":{"ref":"index.html#(todo)-when-and-how-to-bump-api-version","tf":0.75},"index.html#require-https":{"ref":"index.html#require-https","tf":0.75},"index.html#use-swagger-2.0-to-describe-apis":{"ref":"index.html#use-swagger-2.0-to-describe-apis","tf":0.75},"index.html#provide-human-readable-documentation-via-api-connect":{"ref":"index.html#provide-human-readable-documentation-via-api-connect","tf":0.75},"index.html#accept-serialized-json-in-request-bodies":{"ref":"index.html#accept-serialized-json-in-request-bodies","tf":0.75},"index.html#use-consistent-http-methods":{"ref":"index.html#use-consistent-http-methods","tf":0.75},"index.html#special-action-endpoints":{"ref":"index.html#special-action-endpoints","tf":0.75},"index.html#follow-naming-conventions":{"ref":"index.html#follow-naming-conventions","tf":0.777027027027027},"index.html#use-json-naming-conventions":{"ref":"index.html#use-json-naming-conventions","tf":0.75},"index.html#downcase-and-dash-separated-paths":{"ref":"index.html#downcase-and-dash-separated-paths","tf":0.75},"index.html#camelcase-query-parameters":{"ref":"index.html#camelcase-query-parameters","tf":0.75},"index.html#use-consistent-query-parameter-types":{"ref":"index.html#use-consistent-query-parameter-types","tf":0.75},"index.html#minimize-path-nesting":{"ref":"index.html#minimize-path-nesting","tf":0.75},"index.html#resource-names":{"ref":"index.html#resource-names","tf":0.75},"index.html#respond-structured-and-consistent-errors":{"ref":"index.html#respond-structured-and-consistent-errors","tf":0.75},"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.75},"index.html#use-utc-times-formatted-in-iso8601":{"ref":"index.html#use-utc-times-formatted-in-iso8601","tf":0.75},"index.html#provide-resource-(uu)ids":{"ref":"index.html#provide-resource-(uu)ids","tf":0.75},"index.html#services-should":{"ref":"index.html#services-should","tf":0.75},"index.html#separate-concerns":{"ref":"index.html#separate-concerns","tf":0.75},"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.75},"index.html#divide-large-responses-across-requests-with-ranges":{"ref":"index.html#divide-large-responses-across-requests-with-ranges","tf":0.75},"index.html#provide-request-ids-for-introspection":{"ref":"index.html#provide-request-ids-for-introspection","tf":0.75},"index.html#support-http-cache-headers":{"ref":"index.html#support-http-cache-headers","tf":0.75},"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.75},"index.html#gzip-and-keep-json-minified-in-all-responses":{"ref":"index.html#gzip-and-keep-json-minified-in-all-responses","tf":0.75},"index.html#provide-full-resources-where-available":{"ref":"index.html#provide-full-resources-where-available","tf":0.75},"index.html#provide-standard-timestamps":{"ref":"index.html#provide-standard-timestamps","tf":0.75},"index.html#plan-stability-and-versioning":{"ref":"index.html#plan-stability-and-versioning","tf":0.75},"index.html#(todo)-use-_link-for-foreign-key-relations":{"ref":"index.html#(todo)-use-_link-for-foreign-key-relations","tf":0.75},"index.html#service-building-guidelines":{"ref":"index.html#service-building-guidelines","tf":0.75},"index.html#service-has-a-single-responsibility":{"ref":"index.html#service-has-a-single-responsibility","tf":0.75},"index.html#services-are-independent":{"ref":"index.html#services-are-independent","tf":0.75},"index.html#design-for-failures":{"ref":"index.html#design-for-failures","tf":0.75},"index.html#delegate-common-service-needs-to-an-api-gateway":{"ref":"index.html#delegate-common-service-needs-to-an-api-gateway","tf":0.75},"index.html#services-should-have-multiple-environments":{"ref":"index.html#services-should-have-multiple-environments","tf":0.75}}}}},"y":{"docs":{"index.html#use-json-naming-conventions":{"ref":"index.html#use-json-naming-conventions","tf":0.014285714285714285},"index.html#respond-structured-and-consistent-errors":{"ref":"index.html#respond-structured-and-consistent-errors","tf":0.02702702702702703},"index.html#(todo)-use-_link-for-foreign-key-relations":{"ref":"index.html#(todo)-use-_link-for-foreign-key-relations","tf":1.6805555555555554}}},"e":{"docs":{},"p":{"docs":{"index.html#resource-names":{"ref":"index.html#resource-names","tf":0.045454545454545456},"index.html#separate-concerns":{"ref":"index.html#separate-concerns","tf":0.03571428571428571},"index.html#gzip-and-keep-json-minified-in-all-responses":{"ref":"index.html#gzip-and-keep-json-minified-in-all-responses","tf":2.0161290322580645}}}},"p":{"docs":{},"t":{"docs":{"index.html#services-should-have-multiple-environments":{"ref":"index.html#services-should-have-multiple-environments","tf":0.017241379310344827}}}}},"i":{"docs":{},"c":{"docs":{},"k":{"docs":{},"s":{"docs":{},"t":{"docs":{},"a":{"docs":{},"r":{"docs":{},"t":{"docs":{"index.html#provide-certain-mandatory-artifactsactions":{"ref":"index.html#provide-certain-mandatory-artifactsactions","tf":0.018867924528301886}}}}}}}}}},"n":{"docs":{},"o":{"docs":{},"w":{"docs":{},"n":{"docs":{"index.html#use-consistent-http-methods":{"ref":"index.html#use-consistent-http-methods","tf":0.011904761904761904}}}}}}},"o":{"docs":{},"r":{"docs":{},"i":{"docs":{},"g":{"docs":{},"i":{"docs":{},"n":{"docs":{"index.html":{"ref":"index.html","tf":0.04},"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294},"index.html#(todo)-use-_link-for-foreign-key-relations":{"ref":"index.html#(todo)-use-_link-for-foreign-key-relations","tf":0.013888888888888888}}}}}},"d":{"docs":{},"e":{"docs":{},"r":{"docs":{"index.html#divide-large-responses-across-requests-with-ranges":{"ref":"index.html#divide-large-responses-across-requests-with-ranges","tf":0.03571428571428571},"index.html#services-are-independent":{"ref":"index.html#services-are-independent","tf":0.047619047619047616}}}}}},"n":{"docs":{"index.html#require-versioning-headers":{"ref":"index.html#require-versioning-headers","tf":0.017543859649122806},"index.html#use-consistent-http-methods":{"ref":"index.html#use-consistent-http-methods","tf":0.011904761904761904},"index.html#minimize-path-nesting":{"ref":"index.html#minimize-path-nesting","tf":0.043478260869565216},"index.html#provide-resource-(uu)ids":{"ref":"index.html#provide-resource-(uu)ids","tf":0.022988505747126436}},"l":{"docs":{},"y":{"docs":{},"/":{"docs":{},"i":{"docs":{},"d":{"docs":{"index.html#goal-of-the-document":{"ref":"index.html#goal-of-the-document","tf":0.02040816326530612}}}}}}},"t":{"docs":{},"o":{"docs":{},"l":{"docs":{},"o":{"docs":{},"g":{"docs":{"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428}}}}}}},"c":{"docs":{"index.html#plan-stability-and-versioning":{"ref":"index.html#plan-stability-and-versioning","tf":0.02127659574468085}}}},"p":{"docs":{},"e":{"docs":{},"n":{"docs":{"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428}},"i":{"docs":{},"d":{"docs":{"index.html#(todo)-implement-authentication-with-openid-connect":{"ref":"index.html#(todo)-implement-authentication-with-openid-connect","tf":2}}}}},"r":{"docs":{"index.html#require-versioning-headers":{"ref":"index.html#require-versioning-headers","tf":0.017543859649122806},"index.html#service-has-a-single-responsibility":{"ref":"index.html#service-has-a-single-responsibility","tf":0.027777777777777776}}}}},"k":{"docs":{"index.html#require-https":{"ref":"index.html#require-https","tf":0.014705882352941176},"index.html#provide-full-resources-where-available":{"ref":"index.html#provide-full-resources-where-available","tf":0.014925373134328358}}},"u":{"docs":{},"t":{"docs":{"index.html#require-https":{"ref":"index.html#require-https","tf":0.014705882352941176},"index.html#use-swagger-2.0-to-describe-apis":{"ref":"index.html#use-swagger-2.0-to-describe-apis","tf":0.04}},"p":{"docs":{},"u":{"docs":{},"t":{"docs":{"index.html#gzip-and-keep-json-minified-in-all-responses":{"ref":"index.html#gzip-and-keep-json-minified-in-all-responses","tf":0.016129032258064516}}}}}}},"v":{"docs":{},"e":{"docs":{},"r":{"docs":{},"v":{"docs":{},"i":{"docs":{},"e":{"docs":{},"w":{"docs":{"index.html#provide-human-readable-documentation-via-api-connect":{"ref":"index.html#provide-human-readable-documentation-via-api-connect","tf":0.029411764705882353}}}}}},"a":{"docs":{},"l":{"docs":{"index.html#resource-names":{"ref":"index.html#resource-names","tf":0.045454545454545456}}}},"h":{"docs":{},"e":{"docs":{},"a":{"docs":{},"d":{"docs":{"index.html#service-has-a-single-responsibility":{"ref":"index.html#service-has-a-single-responsibility","tf":0.027777777777777776}}}}}}}}},"w":{"docs":{},"n":{"docs":{},"e":{"docs":{},"r":{"docs":{"index.html#accept-serialized-json-in-request-bodies":{"ref":"index.html#accept-serialized-json-in-request-bodies","tf":0.021739130434782608},"index.html#use-json-naming-conventions":{"ref":"index.html#use-json-naming-conventions","tf":0.02857142857142857},"index.html#(todo)-use-_link-for-foreign-key-relations":{"ref":"index.html#(todo)-use-_link-for-foreign-key-relations","tf":0.027777777777777776}},"i":{"docs":{},"d":{"docs":{"index.html#(todo)-use-_link-for-foreign-key-relations":{"ref":"index.html#(todo)-use-_link-for-foreign-key-relations","tf":0.013888888888888888}}}}}}}},"b":{"docs":{},"j":{"docs":{},"e":{"docs":{},"c":{"docs":{},"t":{"docs":{"index.html#use-consistent-http-methods":{"ref":"index.html#use-consistent-http-methods","tf":0.011904761904761904},"index.html#use-consistent-query-parameter-types":{"ref":"index.html#use-consistent-query-parameter-types","tf":0.02702702702702703},"index.html#provide-resource-(uu)ids":{"ref":"index.html#provide-resource-(uu)ids","tf":0.011494252873563218},"index.html#provide-full-resources-where-available":{"ref":"index.html#provide-full-resources-where-available","tf":0.014925373134328358},"index.html#(todo)-use-_link-for-foreign-key-relations":{"ref":"index.html#(todo)-use-_link-for-foreign-key-relations","tf":0.013888888888888888}}}}}}},"f":{"docs":{},"f":{"docs":{},"e":{"docs":{},"r":{"docs":{},"c":{"docs":{},"a":{"docs":{},"t":{"docs":{},"a":{"docs":{},"l":{"docs":{},"o":{"docs":{},"g":{"docs":{"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428}}}}}}}}}}}}},"m":{"docs":{},"i":{"docs":{},"t":{"docs":{"index.html#provide-standard-timestamps":{"ref":"index.html#provide-standard-timestamps","tf":0.047619047619047616}}}}}},"p":{"docs":{},"l":{"docs":{},"a":{"docs":{},"t":{"docs":{},"f":{"docs":{},"o":{"docs":{},"r":{"docs":{},"m":{"docs":{"index.html":{"ref":"index.html","tf":0.04},"index.html#divide-large-responses-across-requests-with-ranges":{"ref":"index.html#divide-large-responses-across-requests-with-ranges","tf":0.03571428571428571}}}}}}},"c":{"docs":{},"e":{"docs":{"index.html#require-versioning-headers":{"ref":"index.html#require-versioning-headers","tf":0.017543859649122806},"index.html#use-swagger-2.0-to-describe-apis":{"ref":"index.html#use-swagger-2.0-to-describe-apis","tf":0.04},"index.html#special-action-endpoints":{"ref":"index.html#special-action-endpoints","tf":0.034482758620689655}}}},"n":{"docs":{"index.html#follow-naming-conventions":{"ref":"index.html#follow-naming-conventions","tf":0.02702702702702703},"index.html#plan-stability-and-versioning":{"ref":"index.html#plan-stability-and-versioning","tf":3.354609929078014}}}},"u":{"docs":{},"r":{"docs":{},"a":{"docs":{},"l":{"docs":{"index.html#use-json-naming-conventions":{"ref":"index.html#use-json-naming-conventions","tf":0.014285714285714285},"index.html#resource-names":{"ref":"index.html#resource-names","tf":0.045454545454545456}}}}},"s":{"docs":{},"s":{"docs":{},"a":{"docs":{},"c":{"docs":{},"a":{"docs":{},"r":{"docs":{},"d":{"docs":{"index.html#use-json-naming-conventions":{"ref":"index.html#use-json-naming-conventions","tf":0.014285714285714285}}}}}}}}}}},"r":{"docs":{},"o":{"docs":{},"g":{"docs":{},"r":{"docs":{},"e":{"docs":{},"s":{"docs":{},"s":{"docs":{"index.html":{"ref":"index.html","tf":0.04},"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.009259259259259259}}}}}}},"c":{"docs":{},"e":{"docs":{},"s":{"docs":{},"s":{"docs":{"index.html#goal-of-the-document":{"ref":"index.html#goal-of-the-document","tf":0.02040816326530612},"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.011299435028248588},"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.06481481481481481}}}}}},"j":{"docs":{},"e":{"docs":{},"c":{"docs":{},"t":{"docs":{"index.html#provide-certain-mandatory-artifactsactions":{"ref":"index.html#provide-certain-mandatory-artifactsactions","tf":0.018867924528301886}}}}}},"v":{"docs":{},"i":{"docs":{},"d":{"docs":{"index.html#provide-certain-mandatory-artifactsactions":{"ref":"index.html#provide-certain-mandatory-artifactsactions","tf":2.5},"index.html#require-versioning-headers":{"ref":"index.html#require-versioning-headers","tf":0.017543859649122806},"index.html#require-https":{"ref":"index.html#require-https","tf":0.014705882352941176},"index.html#provide-human-readable-documentation-via-api-connect":{"ref":"index.html#provide-human-readable-documentation-via-api-connect","tf":1.4579831932773106},"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.011299435028248588},"index.html#provide-resource-(uu)ids":{"ref":"index.html#provide-resource-(uu)ids","tf":3.333333333333333},"index.html#provide-request-ids-for-introspection":{"ref":"index.html#provide-request-ids-for-introspection","tf":2.5454545454545454},"index.html#provide-full-resources-where-available":{"ref":"index.html#provide-full-resources-where-available","tf":2.529850746268657},"index.html#provide-standard-timestamps":{"ref":"index.html#provide-standard-timestamps","tf":3.3809523809523805}}}}},"d":{"docs":{"index.html#services-should-have-multiple-environments":{"ref":"index.html#services-should-have-multiple-environments","tf":0.06896551724137931}},"u":{"docs":{},"c":{"docs":{},"t":{"docs":{"index.html#use-consistent-http-methods":{"ref":"index.html#use-consistent-http-methods","tf":0.07142857142857142},"index.html#minimize-path-nesting":{"ref":"index.html#minimize-path-nesting","tf":0.021739130434782608},"index.html#provide-resource-(uu)ids":{"ref":"index.html#provide-resource-(uu)ids","tf":0.011494252873563218},"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428},"index.html#plan-stability-and-versioning":{"ref":"index.html#plan-stability-and-versioning","tf":0.02127659574468085},"index.html#(todo)-use-_link-for-foreign-key-relations":{"ref":"index.html#(todo)-use-_link-for-foreign-key-relations","tf":0.041666666666666664},"index.html#services-are-independent":{"ref":"index.html#services-are-independent","tf":0.09523809523809523}},"s":{"docs":{},"/":{"docs":{},"a":{"docs":{},"c":{"docs":{},"t":{"docs":{},"i":{"docs":{},"o":{"docs":{},"n":{"docs":{},"s":{"docs":{},"/":{"docs":{},"s":{"docs":{},"e":{"docs":{},"a":{"docs":{},"r":{"docs":{},"c":{"docs":{},"h":{"docs":{"index.html#special-action-endpoints":{"ref":"index.html#special-action-endpoints","tf":0.034482758620689655}}}}}}}}}}}}}}}},":":{"docs":{},"p":{"docs":{},"r":{"docs":{},"o":{"docs":{},"d":{"docs":{},"u":{"docs":{},"c":{"docs":{},"t":{"docs":{},"i":{"docs":{},"d":{"docs":{"index.html#minimize-path-nesting":{"ref":"index.html#minimize-path-nesting","tf":0.021739130434782608}}}}}}}}}}}}}}}}}},"b":{"docs":{},"l":{"docs":{},"e":{"docs":{},"m":{"docs":{"index.html#separate-concerns":{"ref":"index.html#separate-concerns","tf":0.017857142857142856}}}}}},"t":{"docs":{},"o":{"docs":{},"t":{"docs":{},"y":{"docs":{},"p":{"docs":{},"e":{"docs":{},"/":{"docs":{},"d":{"docs":{},"e":{"docs":{},"v":{"docs":{},"e":{"docs":{},"l":{"docs":{},"o":{"docs":{},"p":{"docs":{},"m":{"docs":{},"e":{"docs":{},"n":{"docs":{},"t":{"docs":{},"/":{"docs":{},"p":{"docs":{},"r":{"docs":{},"o":{"docs":{},"d":{"docs":{},"u":{"docs":{},"c":{"docs":{},"t":{"docs":{"index.html#plan-stability-and-versioning":{"ref":"index.html#plan-stability-and-versioning","tf":0.02127659574468085}}}}}}}}}}}}}}}}}}}}}}}}}}}}},"e":{"docs":{},"f":{"docs":{},"e":{"docs":{},"r":{"docs":{"index.html#provide-certain-mandatory-artifactsactions":{"ref":"index.html#provide-certain-mandatory-artifactsactions","tf":0.018867924528301886},"index.html#special-action-endpoints":{"ref":"index.html#special-action-endpoints","tf":0.034482758620689655},"index.html#minimize-path-nesting":{"ref":"index.html#minimize-path-nesting","tf":0.021739130434782608},"index.html#separate-concerns":{"ref":"index.html#separate-concerns","tf":0.017857142857142856},"index.html#(todo)-use-_link-for-foreign-key-relations":{"ref":"index.html#(todo)-use-_link-for-foreign-key-relations","tf":0.013888888888888888}}}},"i":{"docs":{},"x":{"docs":{"index.html#special-action-endpoints":{"ref":"index.html#special-action-endpoints","tf":0.034482758620689655}}}}},"v":{"docs":{},"e":{"docs":{},"n":{"docs":{},"t":{"docs":{"index.html#require-versioning-headers":{"ref":"index.html#require-versioning-headers","tf":0.017543859649122806}}}}}},"t":{"docs":{},"t":{"docs":{},"i":{"docs":{},"f":{"docs":{},"i":{"docs":{"index.html#gzip-and-keep-json-minified-in-all-responses":{"ref":"index.html#gzip-and-keep-json-minified-in-all-responses","tf":0.016129032258064516}}}}}}}},"a":{"docs":{},"c":{"docs":{},"t":{"docs":{},"i":{"docs":{},"c":{"docs":{"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294},"index.html#service-building-guidelines":{"ref":"index.html#service-building-guidelines","tf":0.01818181818181818},"index.html#services-should-have-multiple-environments":{"ref":"index.html#services-should-have-multiple-environments","tf":0.017241379310344827}}}}}}},"i":{"docs":{},"n":{"docs":{},"c":{"docs":{},"i":{"docs":{},"p":{"docs":{},"l":{"docs":{"index.html#service-building-guidelines":{"ref":"index.html#service-building-guidelines","tf":0.01818181818181818}}}}}}}}},"u":{"docs":{},"b":{"docs":{},"l":{"docs":{},"i":{"docs":{},"c":{"docs":{"index.html#provide-certain-mandatory-artifactsactions":{"ref":"index.html#provide-certain-mandatory-artifactsactions","tf":0.018867924528301886},"index.html#provide-resource-(uu)ids":{"ref":"index.html#provide-resource-(uu)ids","tf":0.011494252873563218}}}}}},"t":{"docs":{"index.html#use-consistent-http-methods":{"ref":"index.html#use-consistent-http-methods","tf":0.047619047619047616},"index.html#special-action-endpoints":{"ref":"index.html#special-action-endpoints","tf":0.034482758620689655},"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.01694915254237288}},"/":{"docs":{},"p":{"docs":{},"a":{"docs":{},"t":{"docs":{},"c":{"docs":{},"h":{"docs":{"index.html#provide-full-resources-where-available":{"ref":"index.html#provide-full-resources-where-available","tf":0.014925373134328358}},"/":{"docs":{},"p":{"docs":{},"o":{"docs":{},"s":{"docs":{},"t":{"docs":{"index.html#accept-serialized-json-in-request-bodies":{"ref":"index.html#accept-serialized-json-in-request-bodies","tf":0.021739130434782608}}}}}}}}}}}}}},"r":{"docs":{},"p":{"docs":{},"o":{"docs":{},"s":{"docs":{"index.html#service-building-guidelines":{"ref":"index.html#service-building-guidelines","tf":0.01818181818181818},"index.html#services-should-have-multiple-environments":{"ref":"index.html#services-should-have-multiple-environments","tf":0.017241379310344827}}}}}}},"o":{"docs":{},"r":{"docs":{},"t":{"docs":{"index.html#require-https":{"ref":"index.html#require-https","tf":0.014705882352941176}}}},"s":{"docs":{},"s":{"docs":{},"i":{"docs":{},"b":{"docs":{},"l":{"docs":{"index.html#require-https":{"ref":"index.html#require-https","tf":0.014705882352941176},"index.html#provide-resource-(uu)ids":{"ref":"index.html#provide-resource-(uu)ids","tf":0.022988505747126436},"index.html#provide-full-resources-where-available":{"ref":"index.html#provide-full-resources-where-available","tf":0.014925373134328358},"index.html#plan-stability-and-versioning":{"ref":"index.html#plan-stability-and-versioning","tf":0.02127659574468085},"index.html#(todo)-use-_link-for-foreign-key-relations":{"ref":"index.html#(todo)-use-_link-for-foreign-key-relations","tf":0.013888888888888888},"index.html#services-should-have-multiple-environments":{"ref":"index.html#services-should-have-multiple-environments","tf":0.034482758620689655}}}}}},"t":{"docs":{"index.html#accept-serialized-json-in-request-bodies":{"ref":"index.html#accept-serialized-json-in-request-bodies","tf":0.021739130434782608},"index.html#use-consistent-http-methods":{"ref":"index.html#use-consistent-http-methods","tf":0.023809523809523808},"index.html#special-action-endpoints":{"ref":"index.html#special-action-endpoints","tf":0.034482758620689655},"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.022598870056497175}},"a":{"docs":{},"l":{"docs":{},"a":{"docs":{},"d":{"docs":{},"d":{"docs":{},"r":{"docs":{},"e":{"docs":{},"s":{"docs":{},"s":{"docs":{"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428}}}}}}}}},"c":{"docs":{},"o":{"docs":{},"d":{"docs":{"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428}}}}}}},"g":{"docs":{},"r":{"docs":{"index.html#services-are-independent":{"ref":"index.html#services-are-independent","tf":0.023809523809523808}}}}}},"i":{"docs":{},"n":{"docs":{},"t":{"docs":{"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294},"index.html#design-for-failures":{"ref":"index.html#design-for-failures","tf":0.041666666666666664}}}}},"l":{"docs":{},"l":{"docs":{"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.009259259259259259}}},"i":{"docs":{},"c":{"docs":{},"i":{"docs":{"index.html#plan-stability-and-versioning":{"ref":"index.html#plan-stability-and-versioning","tf":0.02127659574468085}}}}}},"p":{"docs":{},"u":{"docs":{},"l":{"docs":{"index.html#provide-request-ids-for-introspection":{"ref":"index.html#provide-request-ids-for-introspection","tf":0.045454545454545456}}}}}},"a":{"docs":{},"r":{"docs":{},"a":{"docs":{},"m":{"docs":{"index.html#separate-concerns":{"ref":"index.html#separate-concerns","tf":0.017857142857142856}},"e":{"docs":{},"t":{"docs":{"index.html#use-swagger-2.0-to-describe-apis":{"ref":"index.html#use-swagger-2.0-to-describe-apis","tf":0.04},"index.html#camelcase-query-parameters":{"ref":"index.html#camelcase-query-parameters","tf":3.476190476190476},"index.html#use-consistent-query-parameter-types":{"ref":"index.html#use-consistent-query-parameter-types","tf":2.081081081081081},"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294}}}}}},"e":{"docs":{},"n":{"docs":{},"t":{"docs":{},"/":{"docs":{},"c":{"docs":{},"h":{"docs":{},"i":{"docs":{},"l":{"docs":{},"d":{"docs":{"index.html#minimize-path-nesting":{"ref":"index.html#minimize-path-nesting","tf":0.043478260869565216}}}}}}}}}}},"t":{"docs":{"index.html#separate-concerns":{"ref":"index.html#separate-concerns","tf":0.017857142857142856}},"i":{"docs":{"index.html#delegate-common-service-needs-to-an-api-gateway":{"ref":"index.html#delegate-common-service-needs-to-an-api-gateway","tf":0.047619047619047616}},"c":{"docs":{},"u":{"docs":{},"l":{"docs":{},"a":{"docs":{},"r":{"docs":{"index.html#resource-names":{"ref":"index.html#resource-names","tf":0.045454545454545456},"index.html#separate-concerns":{"ref":"index.html#separate-concerns","tf":0.017857142857142856}},"l":{"docs":{},"i":{"docs":{"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294}}}}}}}}},"a":{"docs":{},"l":{"docs":{"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294}}}}}}},"g":{"docs":{},"i":{"docs":{},"n":{"docs":{"index.html#use-consistent-http-methods":{"ref":"index.html#use-consistent-http-methods","tf":0.011904761904761904}}}}},"t":{"docs":{},"c":{"docs":{},"h":{"docs":{"index.html#use-consistent-http-methods":{"ref":"index.html#use-consistent-http-methods","tf":0.023809523809523808},"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.011299435028248588}}}},"h":{"docs":{"index.html#downcase-and-dash-separated-paths":{"ref":"index.html#downcase-and-dash-separated-paths","tf":2.5714285714285716},"index.html#minimize-path-nesting":{"ref":"index.html#minimize-path-nesting","tf":3.3985507246376807},"index.html#provide-resource-(uu)ids":{"ref":"index.html#provide-resource-(uu)ids","tf":0.011494252873563218},"index.html#separate-concerns":{"ref":"index.html#separate-concerns","tf":0.017857142857142856}}}},"y":{"docs":{"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294}},"l":{"docs":{},"o":{"docs":{},"a":{"docs":{},"d":{"docs":{"index.html#respond-structured-and-consistent-errors":{"ref":"index.html#respond-structured-and-consistent-errors","tf":0.05405405405405406}}}}}}},"s":{"docs":{},"s":{"docs":{"index.html#separate-concerns":{"ref":"index.html#separate-concerns","tf":0.017857142857142856}}}}},"e":{"docs":{},"r":{"docs":{},"f":{"docs":{},"e":{"docs":{},"c":{"docs":{},"t":{"docs":{"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.009259259259259259}}}}}},"s":{"docs":{},"i":{"docs":{},"s":{"docs":{},"t":{"docs":{"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.009259259259259259}}}}}}}},"i":{"docs":{},"c":{"docs":{},"k":{"docs":{"index.html#support-http-cache-headers":{"ref":"index.html#support-http-cache-headers","tf":0.027777777777777776},"index.html#service-has-a-single-responsibility":{"ref":"index.html#service-has-a-single-responsibility","tf":0.027777777777777776}}},"t":{"docs":{},"u":{"docs":{},"r":{"docs":{"index.html#service-building-guidelines":{"ref":"index.html#service-building-guidelines","tf":0.01818181818181818}}}}}}},"k":{"0":{"3":{"5":{"docs":{"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428}}},"docs":{}},"docs":{}},"docs":{}}},"s":{"docs":{},"e":{"docs":{},"r":{"docs":{},"v":{"docs":{"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.009259259259259259},"index.html#services-should-have-multiple-environments":{"ref":"index.html#services-should-have-multiple-environments","tf":0.017241379310344827}},"i":{"docs":{},"c":{"docs":{"index.html":{"ref":"index.html","tf":3.25},"index.html#goal-of-the-document":{"ref":"index.html#goal-of-the-document","tf":0.75},"index.html#services-must":{"ref":"index.html#services-must","tf":10.75},"index.html#provide-certain-mandatory-artifactsactions":{"ref":"index.html#provide-certain-mandatory-artifactsactions","tf":0.8443396226415094},"index.html#(todo)-implement-authentication-with-openid-connect":{"ref":"index.html#(todo)-implement-authentication-with-openid-connect","tf":0.75},"index.html#require-versioning-headers":{"ref":"index.html#require-versioning-headers","tf":0.75},"index.html#(todo)-when-and-how-to-bump-api-version":{"ref":"index.html#(todo)-when-and-how-to-bump-api-version","tf":0.75},"index.html#require-https":{"ref":"index.html#require-https","tf":0.75},"index.html#use-swagger-2.0-to-describe-apis":{"ref":"index.html#use-swagger-2.0-to-describe-apis","tf":0.75},"index.html#provide-human-readable-documentation-via-api-connect":{"ref":"index.html#provide-human-readable-documentation-via-api-connect","tf":0.75},"index.html#accept-serialized-json-in-request-bodies":{"ref":"index.html#accept-serialized-json-in-request-bodies","tf":0.75},"index.html#use-consistent-http-methods":{"ref":"index.html#use-consistent-http-methods","tf":0.75},"index.html#special-action-endpoints":{"ref":"index.html#special-action-endpoints","tf":0.75},"index.html#follow-naming-conventions":{"ref":"index.html#follow-naming-conventions","tf":0.8040540540540541},"index.html#use-json-naming-conventions":{"ref":"index.html#use-json-naming-conventions","tf":0.75},"index.html#downcase-and-dash-separated-paths":{"ref":"index.html#downcase-and-dash-separated-paths","tf":0.8928571428571428},"index.html#camelcase-query-parameters":{"ref":"index.html#camelcase-query-parameters","tf":0.75},"index.html#use-consistent-query-parameter-types":{"ref":"index.html#use-consistent-query-parameter-types","tf":0.75},"index.html#minimize-path-nesting":{"ref":"index.html#minimize-path-nesting","tf":0.75},"index.html#resource-names":{"ref":"index.html#resource-names","tf":0.75},"index.html#respond-structured-and-consistent-errors":{"ref":"index.html#respond-structured-and-consistent-errors","tf":0.75},"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.75},"index.html#use-utc-times-formatted-in-iso8601":{"ref":"index.html#use-utc-times-formatted-in-iso8601","tf":0.75},"index.html#provide-resource-(uu)ids":{"ref":"index.html#provide-resource-(uu)ids","tf":0.7729885057471264},"index.html#services-should":{"ref":"index.html#services-should","tf":10.75},"index.html#separate-concerns":{"ref":"index.html#separate-concerns","tf":0.75},"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.75},"index.html#divide-large-responses-across-requests-with-ranges":{"ref":"index.html#divide-large-responses-across-requests-with-ranges","tf":0.75},"index.html#provide-request-ids-for-introspection":{"ref":"index.html#provide-request-ids-for-introspection","tf":0.7954545454545454},"index.html#support-http-cache-headers":{"ref":"index.html#support-http-cache-headers","tf":0.75},"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.75},"index.html#gzip-and-keep-json-minified-in-all-responses":{"ref":"index.html#gzip-and-keep-json-minified-in-all-responses","tf":0.75},"index.html#provide-full-resources-where-available":{"ref":"index.html#provide-full-resources-where-available","tf":0.75},"index.html#provide-standard-timestamps":{"ref":"index.html#provide-standard-timestamps","tf":0.75},"index.html#plan-stability-and-versioning":{"ref":"index.html#plan-stability-and-versioning","tf":0.75},"index.html#(todo)-use-_link-for-foreign-key-relations":{"ref":"index.html#(todo)-use-_link-for-foreign-key-relations","tf":0.7916666666666666},"index.html#service-building-guidelines":{"ref":"index.html#service-building-guidelines","tf":4.119696969696969},"index.html#service-has-a-single-responsibility":{"ref":"index.html#service-has-a-single-responsibility","tf":4.111111111111111},"index.html#services-are-independent":{"ref":"index.html#services-are-independent","tf":5.916666666666667},"index.html#design-for-failures":{"ref":"index.html#design-for-failures","tf":0.75},"index.html#delegate-common-service-needs-to-an-api-gateway":{"ref":"index.html#delegate-common-service-needs-to-an-api-gateway","tf":2.4166666666666665},"index.html#services-should-have-multiple-environments":{"ref":"index.html#services-should-have-multiple-environments","tf":4.083333333333333}},"e":{"docs":{},"’":{"docs":{"index.html#use-swagger-2.0-to-describe-apis":{"ref":"index.html#use-swagger-2.0-to-describe-apis","tf":0.04}}}}}},"e":{"docs":{},"r":{"docs":{"index.html#require-https":{"ref":"index.html#require-https","tf":0.014705882352941176},"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.01694915254237288},"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.009259259259259259},"index.html#provide-request-ids-for-introspection":{"ref":"index.html#provide-request-ids-for-introspection","tf":0.045454545454545456}}}}},"i":{"docs":{},"a":{"docs":{},"l":{"docs":{"index.html#provide-human-readable-documentation-via-api-connect":{"ref":"index.html#provide-human-readable-documentation-via-api-connect","tf":0.029411764705882353},"index.html#accept-serialized-json-in-request-bodies":{"ref":"index.html#accept-serialized-json-in-request-bodies","tf":2.0434782608695654},"index.html#(todo)-use-_link-for-foreign-key-relations":{"ref":"index.html#(todo)-use-_link-for-foreign-key-relations","tf":0.013888888888888888}}}}}},"e":{"docs":{"index.html#provide-certain-mandatory-artifactsactions":{"ref":"index.html#provide-certain-mandatory-artifactsactions","tf":0.018867924528301886},"index.html#require-versioning-headers":{"ref":"index.html#require-versioning-headers","tf":0.017543859649122806},"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294},"index.html#divide-large-responses-across-requests-with-ranges":{"ref":"index.html#divide-large-responses-across-requests-with-ranges","tf":0.03571428571428571},"index.html#plan-stability-and-versioning":{"ref":"index.html#plan-stability-and-versioning","tf":0.02127659574468085}}},"c":{"docs":{},"u":{"docs":{},"r":{"docs":{"index.html#require-https":{"ref":"index.html#require-https","tf":0.014705882352941176}}}}},"n":{"docs":{},"s":{"docs":{"index.html#provide-standard-timestamps":{"ref":"index.html#provide-standard-timestamps","tf":0.047619047619047616}},"i":{"docs":{},"t":{"docs":{"index.html#require-https":{"ref":"index.html#require-https","tf":0.014705882352941176}}}}},"d":{"docs":{"index.html#use-consistent-http-methods":{"ref":"index.html#use-consistent-http-methods","tf":0.011904761904761904}}}},"l":{"docs":{},"e":{"docs":{},"c":{"docs":{},"t":{"docs":{"index.html#provide-human-readable-documentation-via-api-connect":{"ref":"index.html#provide-human-readable-documentation-via-api-connect","tf":0.029411764705882353}}}}}},"p":{"docs":{},"a":{"docs":{},"r":{"docs":{"index.html#downcase-and-dash-separated-paths":{"ref":"index.html#downcase-and-dash-separated-paths","tf":2.5714285714285716},"index.html#separate-concerns":{"ref":"index.html#separate-concerns","tf":5.017857142857143},"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.009259259259259259}}}}},"t":{"docs":{"index.html#services-should-have-multiple-environments":{"ref":"index.html#services-should-have-multiple-environments","tf":0.017241379310344827}},"u":{"docs":{},"p":{"docs":{"index.html#downcase-and-dash-separated-paths":{"ref":"index.html#downcase-and-dash-separated-paths","tf":0.07142857142857142}}}}},"a":{"docs":{},"r":{"docs":{},"c":{"docs":{},"h":{"docs":{"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428}}}}}},"m":{"docs":{},"a":{"docs":{},"n":{"docs":{},"t":{"docs":{"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428}}}}}}},"t":{"docs":{},"a":{"docs":{},"b":{"docs":{},"i":{"docs":{},"l":{"docs":{"index.html":{"ref":"index.html","tf":0.04},"index.html#provide-human-readable-documentation-via-api-connect":{"ref":"index.html#provide-human-readable-documentation-via-api-connect","tf":0.029411764705882353},"index.html#plan-stability-and-versioning":{"ref":"index.html#plan-stability-and-versioning","tf":3.3971631205673756}}}},"l":{"docs":{"index.html#plan-stability-and-versioning":{"ref":"index.html#plan-stability-and-versioning","tf":0.02127659574468085}}}},"r":{"docs":{},"t":{"docs":{"index.html#require-versioning-headers":{"ref":"index.html#require-versioning-headers","tf":0.03508771929824561}},"d":{"docs":{},"a":{"docs":{},"t":{"docs":{"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294}}}}}}},"n":{"docs":{},"d":{"docs":{},"a":{"docs":{},"r":{"docs":{},"d":{"docs":{"index.html#special-action-endpoints":{"ref":"index.html#special-action-endpoints","tf":0.034482758620689655},"index.html#provide-standard-timestamps":{"ref":"index.html#provide-standard-timestamps","tf":3.333333333333333}}}}}}},"t":{"docs":{},"u":{"docs":{"index.html#resource-names":{"ref":"index.html#resource-names","tf":0.09090909090909091},"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":2.516949152542373},"index.html#divide-large-responses-across-requests-with-ranges":{"ref":"index.html#divide-large-responses-across-requests-with-ranges","tf":0.03571428571428571},"index.html#services-are-independent":{"ref":"index.html#services-are-independent","tf":0.047619047619047616}},"s":{"docs":{},"c":{"docs":{},"o":{"docs":{},"d":{"docs":{"index.html#respond-structured-and-consistent-errors":{"ref":"index.html#respond-structured-and-consistent-errors","tf":0.02702702702702703}}}}}}}}},"r":{"docs":{},"i":{"docs":{},"n":{"docs":{},"g":{"docs":{"index.html#use-json-naming-conventions":{"ref":"index.html#use-json-naming-conventions","tf":0.014285714285714285}}}}},"u":{"docs":{},"c":{"docs":{},"t":{"docs":{},"u":{"docs":{},"r":{"docs":{"index.html#respond-structured-and-consistent-errors":{"ref":"index.html#respond-structured-and-consistent-errors","tf":2.527027027027027},"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.026785714285714284},"index.html#(todo)-use-_link-for-foreign-key-relations":{"ref":"index.html#(todo)-use-_link-for-foreign-key-relations","tf":0.013888888888888888}}}}}}},"e":{"docs":{},"e":{"docs":{},"t":{"docs":{},"a":{"docs":{},"d":{"docs":{},"d":{"docs":{},"r":{"docs":{},"e":{"docs":{},"s":{"docs":{},"s":{"docs":{"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428}}}}}}}}}}}}},"o":{"docs":{},"r":{"docs":{},"e":{"docs":{"index.html#minimize-path-nesting":{"ref":"index.html#minimize-path-nesting","tf":0.021739130434782608}},"s":{"docs":{},"/":{"docs":{},":":{"docs":{},"s":{"docs":{},"t":{"docs":{},"o":{"docs":{},"r":{"docs":{},"e":{"docs":{},"i":{"docs":{},"d":{"docs":{"index.html#minimize-path-nesting":{"ref":"index.html#minimize-path-nesting","tf":0.021739130434782608}},"/":{"docs":{},"a":{"docs":{},"s":{"docs":{},"s":{"docs":{},"o":{"docs":{},"r":{"docs":{},"t":{"docs":{"index.html#minimize-path-nesting":{"ref":"index.html#minimize-path-nesting","tf":0.021739130434782608}},"m":{"docs":{},"e":{"docs":{},"n":{"docs":{},"t":{"docs":{},"s":{"docs":{},"/":{"docs":{},":":{"docs":{},"a":{"docs":{},"s":{"docs":{},"s":{"docs":{},"o":{"docs":{},"r":{"docs":{},"t":{"docs":{},"m":{"docs":{},"e":{"docs":{},"n":{"docs":{},"t":{"docs":{},"i":{"docs":{},"d":{"docs":{},"/":{"docs":{},"p":{"docs":{},"r":{"docs":{},"o":{"docs":{},"d":{"docs":{},"u":{"docs":{},"c":{"docs":{},"t":{"docs":{},"s":{"docs":{},"/":{"docs":{},":":{"docs":{},"p":{"docs":{},"r":{"docs":{},"o":{"docs":{},"d":{"docs":{},"u":{"docs":{},"c":{"docs":{},"t":{"docs":{},"i":{"docs":{},"d":{"docs":{"index.html#minimize-path-nesting":{"ref":"index.html#minimize-path-nesting","tf":0.021739130434782608}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}},"i":{"docs":{},"l":{"docs":{},"l":{"docs":{"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.009259259259259259}}}}}},"a":{"docs":{},"m":{"docs":{},"e":{"docs":{"index.html#goal-of-the-document":{"ref":"index.html#goal-of-the-document","tf":0.02040816326530612},"index.html#follow-naming-conventions":{"ref":"index.html#follow-naming-conventions","tf":0.02702702702702703},"index.html#services-are-independent":{"ref":"index.html#services-are-independent","tf":0.023809523809523808},"index.html#services-should-have-multiple-environments":{"ref":"index.html#services-should-have-multiple-environments","tf":0.017241379310344827}}}}},"p":{"docs":{},"e":{"docs":{},"e":{"docs":{},"d":{"docs":{"index.html#goal-of-the-document":{"ref":"index.html#goal-of-the-document","tf":0.02040816326530612}}}},"c":{"docs":{"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294},"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.009259259259259259}},"i":{"docs":{},"f":{"docs":{"index.html#require-versioning-headers":{"ref":"index.html#require-versioning-headers","tf":0.017543859649122806},"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294},"index.html#support-http-cache-headers":{"ref":"index.html#support-http-cache-headers","tf":0.05555555555555555},"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428}},"i":{"docs":{"index.html#require-versioning-headers":{"ref":"index.html#require-versioning-headers","tf":0.017543859649122806},"index.html#provide-human-readable-documentation-via-api-connect":{"ref":"index.html#provide-human-readable-documentation-via-api-connect","tf":0.029411764705882353},"index.html#divide-large-responses-across-requests-with-ranges":{"ref":"index.html#divide-large-responses-across-requests-with-ranges","tf":0.03571428571428571}}}},"a":{"docs":{},"l":{"docs":{"index.html#use-consistent-http-methods":{"ref":"index.html#use-consistent-http-methods","tf":0.011904761904761904},"index.html#special-action-endpoints":{"ref":"index.html#special-action-endpoints","tf":3.4022988505747125}}}}}}},"l":{"docs":{},"i":{"docs":{},"t":{"docs":{"index.html#service-has-a-single-responsibility":{"ref":"index.html#service-has-a-single-responsibility","tf":0.05555555555555555}}}}}},"u":{"docs":{},"p":{"docs":{},"p":{"docs":{},"o":{"docs":{},"r":{"docs":{},"t":{"docs":{"index.html#goal-of-the-document":{"ref":"index.html#goal-of-the-document","tf":0.02040816326530612},"index.html#support-http-cache-headers":{"ref":"index.html#support-http-cache-headers","tf":2.5},"index.html#gzip-and-keep-json-minified-in-all-responses":{"ref":"index.html#gzip-and-keep-json-minified-in-all-responses","tf":0.016129032258064516}}}}}}},"c":{"docs":{},"h":{"docs":{"index.html#require-versioning-headers":{"ref":"index.html#require-versioning-headers","tf":0.017543859649122806},"index.html#provide-resource-(uu)ids":{"ref":"index.html#provide-resource-(uu)ids","tf":0.011494252873563218},"index.html#services-are-independent":{"ref":"index.html#services-are-independent","tf":0.023809523809523808}}},"c":{"docs":{},"e":{"docs":{},"e":{"docs":{},"d":{"docs":{"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.01694915254237288}}}},"s":{"docs":{},"s":{"docs":{"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294}}}}}}},"r":{"docs":{},"p":{"docs":{},"r":{"docs":{},"i":{"docs":{},"s":{"docs":{"index.html#require-versioning-headers":{"ref":"index.html#require-versioning-headers","tf":0.017543859649122806}}}}}},"e":{"docs":{"index.html#use-json-naming-conventions":{"ref":"index.html#use-json-naming-conventions","tf":0.014285714285714285}}}},"i":{"docs":{},"t":{"docs":{"index.html#service-has-a-single-responsibility":{"ref":"index.html#service-has-a-single-responsibility","tf":0.027777777777777776}},"a":{"docs":{},"b":{"docs":{},"l":{"docs":{"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294}}}}}}},"b":{"docs":{},"d":{"docs":{},"o":{"docs":{},"m":{"docs":{},"a":{"docs":{},"i":{"docs":{},"n":{"docs":{},".":{"docs":{},"e":{"docs":{},"x":{"docs":{},"a":{"docs":{},"m":{"docs":{},"p":{"docs":{},"l":{"docs":{},"e":{"docs":{},".":{"docs":{},"c":{"docs":{},"o":{"docs":{},"m":{"docs":{"index.html#provide-full-resources-where-available":{"ref":"index.html#provide-full-resources-where-available","tf":0.014925373134328358}}}}}}}}}}}}}}}}}}}}}},"w":{"docs":{},"a":{"docs":{},"g":{"docs":{},"g":{"docs":{},"e":{"docs":{},"r":{"docs":{"index.html#provide-certain-mandatory-artifactsactions":{"ref":"index.html#provide-certain-mandatory-artifactsactions","tf":0.03773584905660377},"index.html#use-swagger-2.0-to-describe-apis":{"ref":"index.html#use-swagger-2.0-to-describe-apis","tf":2.04},"index.html#provide-human-readable-documentation-via-api-connect":{"ref":"index.html#provide-human-readable-documentation-via-api-connect","tf":0.029411764705882353}}}}}}}},"i":{"docs":{},"m":{"docs":{},"p":{"docs":{},"l":{"docs":{"index.html#separate-concerns":{"ref":"index.html#separate-concerns","tf":0.03571428571428571}},"i":{"docs":{"index.html#require-https":{"ref":"index.html#require-https","tf":0.014705882352941176}}}}},"i":{"docs":{},"l":{"docs":{},"a":{"docs":{},"r":{"docs":{"index.html#use-consistent-query-parameter-types":{"ref":"index.html#use-consistent-query-parameter-types","tf":0.02702702702702703},"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.009259259259259259},"index.html#services-should-have-multiple-environments":{"ref":"index.html#services-should-have-multiple-environments","tf":0.017241379310344827}}}}}}},"n":{"docs":{},"g":{"docs":{},"u":{"docs":{},"l":{"docs":{},"a":{"docs":{},"r":{"docs":{"index.html#use-consistent-query-parameter-types":{"ref":"index.html#use-consistent-query-parameter-types","tf":0.02702702702702703}}}}}},"l":{"docs":{"index.html#service-has-a-single-responsibility":{"ref":"index.html#service-has-a-single-responsibility","tf":3.3611111111111107},"index.html#design-for-failures":{"ref":"index.html#design-for-failures","tf":0.041666666666666664}},"e":{"docs":{},"t":{"docs":{},"o":{"docs":{},"n":{"docs":{"index.html#resource-names":{"ref":"index.html#resource-names","tf":0.045454545454545456}}}}}}}}},"t":{"docs":{},"e":{"docs":{"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294}}}},"z":{"docs":{},"e":{"docs":{"index.html#gzip-and-keep-json-minified-in-all-responses":{"ref":"index.html#gzip-and-keep-json-minified-in-all-responses","tf":0.016129032258064516}}}},"l":{"docs":{},"v":{"docs":{},"e":{"docs":{},"r":{"docs":{"index.html#service-building-guidelines":{"ref":"index.html#service-building-guidelines","tf":0.01818181818181818}}}}}}},"l":{"docs":{},"o":{"docs":{},"p":{"docs":{},"p":{"docs":{},"y":{"docs":{},"/":{"docs":{},"b":{"docs":{},"a":{"docs":{},"d":{"docs":{"index.html#require-https":{"ref":"index.html#require-https","tf":0.014705882352941176}}}}}}}}}}},"h":{"docs":{},"o":{"docs":{},"u":{"docs":{},"l":{"docs":{},"d":{"docs":{},"n":{"docs":{},"’":{"docs":{},"t":{"docs":{"index.html#use-swagger-2.0-to-describe-apis":{"ref":"index.html#use-swagger-2.0-to-describe-apis","tf":0.04}}}}}}}}},"a":{"docs":{},"r":{"docs":{},"e":{"docs":{"index.html#services-should-have-multiple-environments":{"ref":"index.html#services-should-have-multiple-environments","tf":0.017241379310344827}}}}}},"y":{"docs":{},"n":{"docs":{},"c":{"docs":{"index.html#use-swagger-2.0-to-describe-apis":{"ref":"index.html#use-swagger-2.0-to-describe-apis","tf":0.04}},"h":{"docs":{},"r":{"docs":{},"o":{"docs":{},"n":{"docs":{"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.01694915254237288}}}}}}}},"m":{"docs":{},"m":{"docs":{},"e":{"docs":{},"t":{"docs":{},"r":{"docs":{},"i":{"docs":{"index.html#accept-serialized-json-in-request-bodies":{"ref":"index.html#accept-serialized-json-in-request-bodies","tf":0.021739130434782608}}}}}}}},"s":{"docs":{},"t":{"docs":{},"e":{"docs":{},"m":{"docs":{"index.html#resource-names":{"ref":"index.html#resource-names","tf":0.09090909090909091},"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.009259259259259259}}}}}}},"c":{"docs":{},"o":{"docs":{},"p":{"docs":{},"e":{"docs":{"index.html#minimize-path-nesting":{"ref":"index.html#minimize-path-nesting","tf":0.021739130434782608}}}}},"a":{"docs":{},"l":{"docs":{},"e":{"docs":{"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.018518518518518517}}},"a":{"docs":{},"b":{"docs":{},"l":{"docs":{"index.html#design-for-failures":{"ref":"index.html#design-for-failures","tf":0.041666666666666664}}}}}}},"h":{"docs":{},"e":{"docs":{},"m":{"docs":{},"a":{"docs":{"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428}},".":{"docs":{},"o":{"docs":{},"r":{"docs":{},"g":{"docs":{"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":2.0267857142857144}}}}}}}}}}},"o":{"docs":{},"u":{"docs":{},"r":{"docs":{},"c":{"docs":{"index.html#respond-structured-and-consistent-errors":{"ref":"index.html#respond-structured-and-consistent-errors","tf":0.02702702702702703}}}}},"m":{"docs":{},"e":{"docs":{},"t":{"docs":{},"h":{"docs":{"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294}}}}}}},"m":{"docs":{},"e":{"docs":{},"l":{"docs":{},"l":{"docs":{"index.html#services-are-independent":{"ref":"index.html#services-are-independent","tf":0.023809523809523808}}}}}}},"t":{"docs":{},"r":{"docs":{},"a":{"docs":{},"n":{"docs":{},"s":{"docs":{},"f":{"docs":{},"o":{"docs":{},"r":{"docs":{},"m":{"docs":{"index.html":{"ref":"index.html","tf":0.04}}}}},"e":{"docs":{},"r":{"docs":{"index.html#separate-concerns":{"ref":"index.html#separate-concerns","tf":0.017857142857142856}}}}},"i":{"docs":{},"t":{"docs":{"index.html#require-versioning-headers":{"ref":"index.html#require-versioning-headers","tf":0.017543859649122806}}}}}},"f":{"docs":{},"f":{"docs":{},"i":{"docs":{},"c":{"docs":{"index.html#require-https":{"ref":"index.html#require-https","tf":0.014705882352941176}}}}}},"c":{"docs":{},"e":{"docs":{"index.html#provide-request-ids-for-introspection":{"ref":"index.html#provide-request-ids-for-introspection","tf":0.045454545454545456}}}}},"i":{"docs":{"index.html#goal-of-the-document":{"ref":"index.html#goal-of-the-document","tf":0.02040816326530612},"index.html#require-https":{"ref":"index.html#require-https","tf":0.014705882352941176}}},"u":{"docs":{},"s":{"docs":{},"t":{"docs":{"index.html#goal-of-the-document":{"ref":"index.html#goal-of-the-document","tf":0.02040816326530612},"index.html#follow-naming-conventions":{"ref":"index.html#follow-naming-conventions","tf":0.02702702702702703}}}}},"e":{"docs":{},"a":{"docs":{},"t":{"docs":{"index.html#design-for-failures":{"ref":"index.html#design-for-failures","tf":0.041666666666666664}}}}}},"e":{"docs":{},"n":{"docs":{"index.html#goal-of-the-document":{"ref":"index.html#goal-of-the-document","tf":0.02040816326530612}}},"s":{"docs":{},"t":{"docs":{"index.html#use-json-naming-conventions":{"ref":"index.html#use-json-naming-conventions","tf":0.014285714285714285},"index.html#services-should-have-multiple-environments":{"ref":"index.html#services-should-have-multiple-environments","tf":0.034482758620689655}}}},"l":{"docs":{},"e":{"docs":{},"p":{"docs":{},"h":{"docs":{},"o":{"docs":{},"n":{"docs":{"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428}}}}}}}},"c":{"docs":{},"h":{"docs":{},"n":{"docs":{},"o":{"docs":{},"l":{"docs":{},"o":{"docs":{},"g":{"docs":{"index.html#service-has-a-single-responsibility":{"ref":"index.html#service-has-a-single-responsibility","tf":0.027777777777777776}}}}}}}}}},"i":{"docs":{},"p":{"docs":{"index.html#provide-certain-mandatory-artifactsactions":{"ref":"index.html#provide-certain-mandatory-artifactsactions","tf":0.018867924528301886}}},"m":{"docs":{},"e":{"docs":{"index.html#follow-naming-conventions":{"ref":"index.html#follow-naming-conventions","tf":0.02702702702702703},"index.html#use-utc-times-formatted-in-iso8601":{"ref":"index.html#use-utc-times-formatted-in-iso8601","tf":2.1333333333333333},"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.018518518518518517},"index.html#services-are-independent":{"ref":"index.html#services-are-independent","tf":0.023809523809523808},"index.html#design-for-failures":{"ref":"index.html#design-for-failures","tf":0.041666666666666664},"index.html#services-should-have-multiple-environments":{"ref":"index.html#services-should-have-multiple-environments","tf":0.034482758620689655}},"s":{"docs":{},"t":{"docs":{},"a":{"docs":{},"m":{"docs":{},"p":{"docs":{"index.html#use-utc-times-formatted-in-iso8601":{"ref":"index.html#use-utc-times-formatted-in-iso8601","tf":0.06666666666666667},"index.html#provide-standard-timestamps":{"ref":"index.html#provide-standard-timestamps","tf":3.4285714285714284}}}}}}}}},"c":{"docs":{},"k":{"docs":{},"e":{"docs":{},"t":{"docs":{"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.009259259259259259}}}}}}},"o":{"docs":{},"d":{"docs":{},"o":{"docs":{"index.html#(todo)-implement-authentication-with-openid-connect":{"ref":"index.html#(todo)-implement-authentication-with-openid-connect","tf":2},"index.html#(todo)-when-and-how-to-bump-api-version":{"ref":"index.html#(todo)-when-and-how-to-bump-api-version","tf":2.5},"index.html#(todo)-use-_link-for-foreign-key-relations":{"ref":"index.html#(todo)-use-_link-for-foreign-key-relations","tf":1.6666666666666665}}}},"k":{"docs":{},"e":{"docs":{},"n":{"docs":{"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.011299435028248588}}}}},"p":{"docs":{"index.html#(todo)-use-_link-for-foreign-key-relations":{"ref":"index.html#(todo)-use-_link-for-foreign-key-relations","tf":0.013888888888888888}}}},"y":{"docs":{},"p":{"docs":{},"e":{"docs":{"index.html#require-versioning-headers":{"ref":"index.html#require-versioning-headers","tf":0.017543859649122806},"index.html#accept-serialized-json-in-request-bodies":{"ref":"index.html#accept-serialized-json-in-request-bodies","tf":0.021739130434782608},"index.html#use-json-naming-conventions":{"ref":"index.html#use-json-naming-conventions","tf":0.014285714285714285},"index.html#use-consistent-query-parameter-types":{"ref":"index.html#use-consistent-query-parameter-types","tf":2.027027027027027},"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.03571428571428571},"index.html#provide-full-resources-where-available":{"ref":"index.html#provide-full-resources-where-available","tf":0.029850746268656716}}}}},"l":{"docs":{"index.html#require-https":{"ref":"index.html#require-https","tf":0.07352941176470588}}},"a":{"docs":{},"k":{"docs":{},"e":{"docs":{"index.html#follow-naming-conventions":{"ref":"index.html#follow-naming-conventions","tf":0.02702702702702703},"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.018518518518518517}},"n":{"docs":{"index.html#follow-naming-conventions":{"ref":"index.html#follow-naming-conventions","tf":0.02702702702702703}}}}},"s":{"docs":{},"k":{"docs":{"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294}}}},"m":{"docs":{},"p":{"docs":{},"e":{"docs":{},"r":{"docs":{"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428}}}}}}},"h":{"docs":{},"i":{"docs":{},"n":{"docs":{},"k":{"docs":{"index.html#provide-resource-(uu)ids":{"ref":"index.html#provide-resource-(uu)ids","tf":0.011494252873563218}}},"g":{"docs":{"index.html#separate-concerns":{"ref":"index.html#separate-concerns","tf":0.017857142857142856}}}}},"o":{"docs":{},"u":{"docs":{},"g":{"docs":{},"h":{"docs":{"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.009259259259259259}}}}}},"u":{"docs":{},"m":{"docs":{},"b":{"docs":{"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.009259259259259259}}}}},"r":{"docs":{},"o":{"docs":{},"u":{"docs":{},"g":{"docs":{},"h":{"docs":{"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428},"index.html#service-building-guidelines":{"ref":"index.html#service-building-guidelines","tf":0.01818181818181818}}}}}}}},"u":{"docs":{},"r":{"docs":{},"v":{"docs":{},"e":{"docs":{},"s":{"docs":{},"u":{"docs":{},"o":{"docs":{},"n":{"docs":{},"k":{"docs":{},"a":{"docs":{},"t":{"docs":{},"u":{"docs":{"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428}}}}}}}}}}}}}}},"u":{"docs":{},"s":{"docs":{"index.html":{"ref":"index.html","tf":0.04},"index.html#provide-certain-mandatory-artifactsactions":{"ref":"index.html#provide-certain-mandatory-artifactsactions","tf":0.018867924528301886},"index.html#require-versioning-headers":{"ref":"index.html#require-versioning-headers","tf":0.017543859649122806},"index.html#require-https":{"ref":"index.html#require-https","tf":0.014705882352941176},"index.html#use-swagger-2.0-to-describe-apis":{"ref":"index.html#use-swagger-2.0-to-describe-apis","tf":2},"index.html#provide-human-readable-documentation-via-api-connect":{"ref":"index.html#provide-human-readable-documentation-via-api-connect","tf":0.029411764705882353},"index.html#use-consistent-http-methods":{"ref":"index.html#use-consistent-http-methods","tf":2.5},"index.html#special-action-endpoints":{"ref":"index.html#special-action-endpoints","tf":0.034482758620689655},"index.html#follow-naming-conventions":{"ref":"index.html#follow-naming-conventions","tf":0.05405405405405406},"index.html#use-json-naming-conventions":{"ref":"index.html#use-json-naming-conventions","tf":2.5428571428571427},"index.html#downcase-and-dash-separated-paths":{"ref":"index.html#downcase-and-dash-separated-paths","tf":0.07142857142857142},"index.html#camelcase-query-parameters":{"ref":"index.html#camelcase-query-parameters","tf":0.14285714285714285},"index.html#use-consistent-query-parameter-types":{"ref":"index.html#use-consistent-query-parameter-types","tf":2.027027027027027},"index.html#minimize-path-nesting":{"ref":"index.html#minimize-path-nesting","tf":0.021739130434782608},"index.html#resource-names":{"ref":"index.html#resource-names","tf":0.045454545454545456},"index.html#respond-structured-and-consistent-errors":{"ref":"index.html#respond-structured-and-consistent-errors","tf":0.02702702702702703},"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.011299435028248588},"index.html#use-utc-times-formatted-in-iso8601":{"ref":"index.html#use-utc-times-formatted-in-iso8601","tf":2},"index.html#provide-resource-(uu)ids":{"ref":"index.html#provide-resource-(uu)ids","tf":0.06896551724137931},"index.html#separate-concerns":{"ref":"index.html#separate-concerns","tf":0.03571428571428571},"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":1.6944444444444442},"index.html#divide-large-responses-across-requests-with-ranges":{"ref":"index.html#divide-large-responses-across-requests-with-ranges","tf":0.03571428571428571},"index.html#support-http-cache-headers":{"ref":"index.html#support-http-cache-headers","tf":0.1111111111111111},"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":2.0089285714285716},"index.html#(todo)-use-_link-for-foreign-key-relations":{"ref":"index.html#(todo)-use-_link-for-foreign-key-relations","tf":1.6666666666666665},"index.html#service-building-guidelines":{"ref":"index.html#service-building-guidelines","tf":0.01818181818181818},"index.html#design-for-failures":{"ref":"index.html#design-for-failures","tf":0.041666666666666664},"index.html#services-should-have-multiple-environments":{"ref":"index.html#services-should-have-multiple-environments","tf":0.017241379310344827}},"e":{"docs":{},"r":{"docs":{"index.html#goal-of-the-document":{"ref":"index.html#goal-of-the-document","tf":0.02040816326530612},"index.html#require-versioning-headers":{"ref":"index.html#require-versioning-headers","tf":0.017543859649122806},"index.html#use-json-naming-conventions":{"ref":"index.html#use-json-naming-conventions","tf":0.014285714285714285},"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.01694915254237288},"index.html#support-http-cache-headers":{"ref":"index.html#support-http-cache-headers","tf":0.027777777777777776},"index.html#delegate-common-service-needs-to-an-api-gateway":{"ref":"index.html#delegate-common-service-needs-to-an-api-gateway","tf":0.047619047619047616},"index.html#services-should-have-multiple-environments":{"ref":"index.html#services-should-have-multiple-environments","tf":0.017241379310344827}},"n":{"docs":{},"a":{"docs":{},"m":{"docs":{},"e":{"docs":{},"@":{"docs":{},"e":{"docs":{},"x":{"docs":{},"a":{"docs":{},"m":{"docs":{},"p":{"docs":{},"l":{"docs":{},"e":{"docs":{},".":{"docs":{},"c":{"docs":{},"o":{"docs":{},"m":{"docs":{"index.html#accept-serialized-json-in-request-bodies":{"ref":"index.html#accept-serialized-json-in-request-bodies","tf":0.021739130434782608}}}}}}}}}}}}}}}}}}},"l":{"docs":{},"e":{"docs":{},"s":{"docs":{},"s":{"docs":{"index.html#require-https":{"ref":"index.html#require-https","tf":0.014705882352941176}}}}}}},"u":{"docs":{},"a":{"docs":{},"l":{"docs":{"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.009259259259259259}}}}}},"p":{"docs":{"index.html#goal-of-the-document":{"ref":"index.html#goal-of-the-document","tf":0.02040816326530612},"index.html#require-https":{"ref":"index.html#require-https","tf":0.014705882352941176},"index.html#service-has-a-single-responsibility":{"ref":"index.html#service-has-a-single-responsibility","tf":0.027777777777777776}},"l":{"docs":{},"o":{"docs":{},"a":{"docs":{},"d":{"docs":{"index.html#provide-certain-mandatory-artifactsactions":{"ref":"index.html#provide-certain-mandatory-artifactsactions","tf":0.018867924528301886}}}}}},"d":{"docs":{},"a":{"docs":{},"t":{"docs":{"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294},"index.html#support-http-cache-headers":{"ref":"index.html#support-http-cache-headers","tf":0.027777777777777776},"index.html#services-are-independent":{"ref":"index.html#services-are-independent","tf":0.023809523809523808}},"e":{"docs":{},"d":{"docs":{},"a":{"docs":{},"t":{"docs":{"index.html#gzip-and-keep-json-minified-in-all-responses":{"ref":"index.html#gzip-and-keep-json-minified-in-all-responses","tf":0.016129032258064516},"index.html#provide-full-resources-where-available":{"ref":"index.html#provide-full-resources-where-available","tf":0.014925373134328358},"index.html#provide-standard-timestamps":{"ref":"index.html#provide-standard-timestamps","tf":0.09523809523809523}}}}}}}}}},"n":{"docs":{},"k":{"docs":{},"n":{"docs":{},"o":{"docs":{},"w":{"docs":{},"n":{"docs":{"index.html#use-consistent-http-methods":{"ref":"index.html#use-consistent-http-methods","tf":0.011904761904761904}}}}}}},"d":{"docs":{},"e":{"docs":{},"r":{"docs":{"index.html#special-action-endpoints":{"ref":"index.html#special-action-endpoints","tf":0.034482758620689655}},"l":{"docs":{},"i":{"docs":{"index.html#service-building-guidelines":{"ref":"index.html#service-building-guidelines","tf":0.01818181818181818}}}},"s":{"docs":{},"t":{"docs":{},"a":{"docs":{},"n":{"docs":{},"d":{"docs":{"index.html#service-building-guidelines":{"ref":"index.html#service-building-guidelines","tf":0.01818181818181818}}}}}}}}}},"l":{"docs":{},"e":{"docs":{},"s":{"docs":{},"s":{"docs":{"index.html#resource-names":{"ref":"index.html#resource-names","tf":0.045454545454545456},"index.html#provide-resource-(uu)ids":{"ref":"index.html#provide-resource-(uu)ids","tf":0.011494252873563218}}}}}},"a":{"docs":{},"u":{"docs":{},"t":{"docs":{},"h":{"docs":{},"o":{"docs":{},"r":{"docs":{"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294}}}}}}}},"p":{"docs":{},"r":{"docs":{},"o":{"docs":{},"c":{"docs":{},"e":{"docs":{},"s":{"docs":{},"s":{"docs":{"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294}}}}}}}}},"i":{"docs":{},"q":{"docs":{},"u":{"docs":{"index.html#provide-resource-(uu)ids":{"ref":"index.html#provide-resource-(uu)ids","tf":0.034482758620689655}}}}},"n":{"docs":{},"e":{"docs":{},"c":{"docs":{},"e":{"docs":{},"s":{"docs":{},"s":{"docs":{},"s":{"docs":{},"a":{"docs":{},"r":{"docs":{},"i":{"docs":{"index.html#service-has-a-single-responsibility":{"ref":"index.html#service-has-a-single-responsibility","tf":0.027777777777777776}}}}}}}}}}}},"s":{"docs":{},"u":{"docs":{},"r":{"docs":{"index.html#service-has-a-single-responsibility":{"ref":"index.html#service-has-a-single-responsibility","tf":0.027777777777777776}}}}}},"r":{"docs":{},"l":{"docs":{"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294},"index.html#provide-resource-(uu)ids":{"ref":"index.html#provide-resource-(uu)ids","tf":0.011494252873563218},"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428}}}},"t":{"docs":{},"c":{"docs":{"index.html#use-utc-times-formatted-in-iso8601":{"ref":"index.html#use-utc-times-formatted-in-iso8601","tf":2.066666666666667}}}},"u":{"docs":{},")":{"docs":{},"i":{"docs":{},"d":{"docs":{"index.html#provide-resource-(uu)ids":{"ref":"index.html#provide-resource-(uu)ids","tf":3.333333333333333}}}}},"i":{"docs":{},"d":{"docs":{"index.html#provide-resource-(uu)ids":{"ref":"index.html#provide-resource-(uu)ids","tf":0.034482758620689655},"index.html#provide-request-ids-for-introspection":{"ref":"index.html#provide-request-ids-for-introspection","tf":0.045454545454545456}}}}}},"w":{"docs":{},"o":{"docs":{},"r":{"docs":{},"k":{"docs":{"index.html":{"ref":"index.html","tf":0.08},"index.html#services-should-have-multiple-environments":{"ref":"index.html#services-should-have-multiple-environments","tf":0.017241379310344827}},"e":{"docs":{},"r":{"docs":{"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294},"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.05555555555555555}}}}},"t":{"docs":{},"h":{"docs":{"index.html#require-https":{"ref":"index.html#require-https","tf":0.014705882352941176}}}},"d":{"docs":{"index.html#minimize-path-nesting":{"ref":"index.html#minimize-path-nesting","tf":0.021739130434782608},"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428}}}},"n":{"docs":{},"’":{"docs":{},"t":{"docs":{"index.html#provide-resource-(uu)ids":{"ref":"index.html#provide-resource-(uu)ids","tf":0.011494252873563218}}}}}},"a":{"docs":{},"y":{"docs":{"index.html#goal-of-the-document":{"ref":"index.html#goal-of-the-document","tf":0.04081632653061224},"index.html#resource-names":{"ref":"index.html#resource-names","tf":0.045454545454545456},"index.html#support-http-cache-headers":{"ref":"index.html#support-http-cache-headers","tf":0.027777777777777776},"index.html#service-has-a-single-responsibility":{"ref":"index.html#service-has-a-single-responsibility","tf":0.027777777777777776}}}},"e":{"docs":{},"l":{"docs":{},"l":{"docs":{"index.html#goal-of-the-document":{"ref":"index.html#goal-of-the-document","tf":0.02040816326530612}}}},"’":{"docs":{},"r":{"docs":{"index.html#goal-of-the-document":{"ref":"index.html#goal-of-the-document","tf":0.02040816326530612}}}},"i":{"docs":{},"g":{"docs":{},"h":{"docs":{},"t":{"docs":{"index.html#respond-structured-and-consistent-errors":{"ref":"index.html#respond-structured-and-consistent-errors","tf":0.08108108108108109}}}}}},"n":{"docs":{},"t":{"docs":{"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294}}}},"b":{"docs":{"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.009259259259259259},"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428}}}},"i":{"docs":{},"t":{"docs":{},"h":{"docs":{},"o":{"docs":{},"u":{"docs":{},"t":{"docs":{"index.html#require-https":{"ref":"index.html#require-https","tf":0.029411764705882353},"index.html#(todo)-use-_link-for-foreign-key-relations":{"ref":"index.html#(todo)-use-_link-for-foreign-key-relations","tf":0.013888888888888888}}}}},"i":{"docs":{},"n":{"docs":{"index.html#resource-names":{"ref":"index.html#resource-names","tf":0.045454545454545456},"index.html#plan-stability-and-versioning":{"ref":"index.html#plan-stability-and-versioning","tf":0.02127659574468085}}}}}},"s":{"docs":{},"e":{"docs":{"index.html#follow-naming-conventions":{"ref":"index.html#follow-naming-conventions","tf":0.02702702702702703}}}}},"r":{"docs":{},"o":{"docs":{},"n":{"docs":{},"g":{"docs":{"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294}}}}},"i":{"docs":{},"t":{"docs":{},"e":{"docs":{"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.009259259259259259}}}}}},"h":{"docs":{},"i":{"docs":{},"t":{"docs":{},"e":{"docs":{},"s":{"docs":{},"p":{"docs":{},"a":{"docs":{},"c":{"docs":{"index.html#gzip-and-keep-json-minified-in-all-responses":{"ref":"index.html#gzip-and-keep-json-minified-in-all-responses","tf":0.016129032258064516}}}}}}}}},"e":{"docs":{},"n":{"docs":{},"e":{"docs":{},"v":{"docs":{"index.html#provide-full-resources-where-available":{"ref":"index.html#provide-full-resources-where-available","tf":0.014925373134328358}}}}}},"o":{"docs":{},"l":{"docs":{},"e":{"docs":{"index.html#service-building-guidelines":{"ref":"index.html#service-building-guidelines","tf":0.03636363636363636},"index.html#delegate-common-service-needs-to-an-api-gateway":{"ref":"index.html#delegate-common-service-needs-to-an-api-gateway","tf":0.047619047619047616}}}}}}},"b":{"docs":{},"i":{"docs":{},"k":{"docs":{},"e":{"docs":{},"s":{"docs":{},"h":{"docs":{},"e":{"docs":{},"d":{"docs":{"index.html#goal-of-the-document":{"ref":"index.html#goal-of-the-document","tf":0.02040816326530612}}}}}}}},"r":{"docs":{},"t":{"docs":{},"h":{"docs":{},"y":{"docs":{},"e":{"docs":{},"a":{"docs":{},"r":{"docs":{"index.html#use-json-naming-conventions":{"ref":"index.html#use-json-naming-conventions","tf":0.014285714285714285}}}}}}}}}},"u":{"docs":{},"s":{"docs":{},"i":{"docs":{"index.html#goal-of-the-document":{"ref":"index.html#goal-of-the-document","tf":0.02040816326530612},"index.html#service-has-a-single-responsibility":{"ref":"index.html#service-has-a-single-responsibility","tf":0.027777777777777776}}}},"i":{"docs":{},"l":{"docs":{},"d":{"docs":{"index.html#provide-certain-mandatory-artifactsactions":{"ref":"index.html#provide-certain-mandatory-artifactsactions","tf":0.03773584905660377},"index.html#service-building-guidelines":{"ref":"index.html#service-building-guidelines","tf":3.333333333333333}}},"t":{"docs":{"index.html#service-building-guidelines":{"ref":"index.html#service-building-guidelines","tf":0.01818181818181818}}}}},"m":{"docs":{},"p":{"docs":{"index.html#(todo)-when-and-how-to-bump-api-version":{"ref":"index.html#(todo)-when-and-how-to-bump-api-version","tf":2.5}}}},"l":{"docs":{},"l":{"docs":{},"e":{"docs":{},"t":{"docs":{"index.html#service-building-guidelines":{"ref":"index.html#service-building-guidelines","tf":0.01818181818181818}}}}}}},"e":{"docs":{},"s":{"docs":{},"t":{"docs":{"index.html#require-versioning-headers":{"ref":"index.html#require-versioning-headers","tf":0.07017543859649122},"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294},"index.html#gzip-and-keep-json-minified-in-all-responses":{"ref":"index.html#gzip-and-keep-json-minified-in-all-responses","tf":0.016129032258064516},"index.html#service-building-guidelines":{"ref":"index.html#service-building-guidelines","tf":0.01818181818181818},"index.html#service-has-a-single-responsibility":{"ref":"index.html#service-has-a-single-responsibility","tf":0.027777777777777776}}}},"t":{"docs":{},"w":{"docs":{},"e":{"docs":{},"e":{"docs":{},"n":{"docs":{"index.html#require-versioning-headers":{"ref":"index.html#require-versioning-headers","tf":0.017543859649122806},"index.html#separate-concerns":{"ref":"index.html#separate-concerns","tf":0.017857142857142856}}}}}},"a":{"docs":{"index.html#gzip-and-keep-json-minified-in-all-responses":{"ref":"index.html#gzip-and-keep-json-minified-in-all-responses","tf":0.016129032258064516}},"\"":{"docs":{},":":{"docs":{},"f":{"docs":{},"a":{"docs":{},"l":{"docs":{},"s":{"docs":{},"e":{"docs":{},",":{"docs":{},"\"":{"docs":{},"e":{"docs":{},"m":{"docs":{},"a":{"docs":{},"i":{"docs":{},"l":{"docs":{},"\"":{"docs":{},":":{"docs":{},"\"":{"docs":{},"a":{"docs":{},"l":{"docs":{},"i":{"docs":{},"c":{"docs":{},"e":{"docs":{},"@":{"docs":{},"h":{"docs":{},"e":{"docs":{},"r":{"docs":{},"o":{"docs":{},"k":{"docs":{},"u":{"docs":{},".":{"docs":{},"c":{"docs":{},"o":{"docs":{},"m":{"docs":{},"\"":{"docs":{},",":{"docs":{},"\"":{"docs":{},"i":{"docs":{},"d":{"docs":{},"\"":{"docs":{},":":{"docs":{},"\"":{"0":{"1":{"2":{"3":{"4":{"5":{"6":{"7":{"docs":{"index.html#gzip-and-keep-json-minified-in-all-responses":{"ref":"index.html#gzip-and-keep-json-minified-in-all-responses","tf":0.016129032258064516}}},"docs":{}},"docs":{}},"docs":{}},"docs":{}},"docs":{}},"docs":{}},"docs":{}},"docs":{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}},"t":{"docs":{},"e":{"docs":{},"r":{"docs":{"index.html#service-has-a-single-responsibility":{"ref":"index.html#service-has-a-single-responsibility","tf":0.027777777777777776}}}}}},"h":{"docs":{},"a":{"docs":{},"v":{"docs":{},"i":{"docs":{},"o":{"docs":{},"u":{"docs":{},"r":{"docs":{"index.html#require-https":{"ref":"index.html#require-https","tf":0.014705882352941176}}}}}}}}},"f":{"docs":{},"o":{"docs":{},"r":{"docs":{"index.html#use-consistent-http-methods":{"ref":"index.html#use-consistent-http-methods","tf":0.023809523809523808},"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294},"index.html#provide-resource-(uu)ids":{"ref":"index.html#provide-resource-(uu)ids","tf":0.011494252873563218},"index.html#design-for-failures":{"ref":"index.html#design-for-failures","tf":0.041666666666666664},"index.html#services-should-have-multiple-environments":{"ref":"index.html#services-should-have-multiple-environments","tf":0.017241379310344827}}}}},"c":{"docs":{},"o":{"docs":{},"m":{"docs":{"index.html#follow-naming-conventions":{"ref":"index.html#follow-naming-conventions","tf":0.02702702702702703},"index.html#minimize-path-nesting":{"ref":"index.html#minimize-path-nesting","tf":0.021739130434782608}}}}},"l":{"docs":{},"o":{"docs":{},"n":{"docs":{},"g":{"docs":{"index.html#minimize-path-nesting":{"ref":"index.html#minimize-path-nesting","tf":0.043478260869565216}}}}}},"n":{"docs":{},"e":{"docs":{},"f":{"docs":{},"i":{"docs":{},"t":{"docs":{"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.009259259259259259},"index.html#service-building-guidelines":{"ref":"index.html#service-building-guidelines","tf":0.03636363636363636}}}}}}}},"r":{"docs":{},"e":{"docs":{},"a":{"docs":{},"k":{"docs":{"index.html#require-versioning-headers":{"ref":"index.html#require-versioning-headers","tf":0.017543859649122806},"index.html#services-should-have-multiple-environments":{"ref":"index.html#services-should-have-multiple-environments","tf":0.017241379310344827}}}}},"o":{"docs":{},"k":{"docs":{},"e":{"docs":{},"n":{"docs":{"index.html#divide-large-responses-across-requests-with-ranges":{"ref":"index.html#divide-large-responses-across-requests-with-ranges","tf":0.03571428571428571},"index.html#services-are-independent":{"ref":"index.html#services-are-independent","tf":0.023809523809523808}}}}},"a":{"docs":{},"d":{"docs":{},"e":{"docs":{},"r":{"docs":{"index.html#service-has-a-single-responsibility":{"ref":"index.html#service-has-a-single-responsibility","tf":0.027777777777777776}}}}}}},"a":{"docs":{},"n":{"docs":{},"c":{"docs":{},"h":{"docs":{},"c":{"docs":{},"o":{"docs":{},"d":{"docs":{"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428}}}}}}}}}},"o":{"docs":{},"d":{"docs":{},"i":{"docs":{"index.html#accept-serialized-json-in-request-bodies":{"ref":"index.html#accept-serialized-json-in-request-bodies","tf":2.0434782608695654},"index.html#use-consistent-query-parameter-types":{"ref":"index.html#use-consistent-query-parameter-types","tf":0.02702702702702703},"index.html#respond-structured-and-consistent-errors":{"ref":"index.html#respond-structured-and-consistent-errors","tf":0.02702702702702703},"index.html#separate-concerns":{"ref":"index.html#separate-concerns","tf":0.017857142857142856}}}},"o":{"docs":{},"l":{"docs":{},"e":{"docs":{},"a":{"docs":{},"n":{"docs":{"index.html#use-consistent-query-parameter-types":{"ref":"index.html#use-consistent-query-parameter-types","tf":0.02702702702702703}}}}}},"m":{"docs":{"index.html#respond-structured-and-consistent-errors":{"ref":"index.html#respond-structured-and-consistent-errors","tf":0.02702702702702703}}}},"u":{"docs":{},"n":{"docs":{},"d":{"docs":{"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.009259259259259259}}}}}},"a":{"docs":{},"d":{"docs":{"index.html#use-consistent-query-parameter-types":{"ref":"index.html#use-consistent-query-parameter-types","tf":0.02702702702702703},"index.html#respond-structured-and-consistent-errors":{"ref":"index.html#respond-structured-and-consistent-errors","tf":0.05405405405405406},"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294},"index.html#services-are-independent":{"ref":"index.html#services-are-independent","tf":0.023809523809523808}}},"c":{"docs":{},"k":{"docs":{"index.html#provide-request-ids-for-introspection":{"ref":"index.html#provide-request-ids-for-introspection","tf":0.045454545454545456}},"g":{"docs":{},"r":{"docs":{},"o":{"docs":{},"u":{"docs":{},"n":{"docs":{},"d":{"docs":{"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294},"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.018518518518518517}}}}}}}},"w":{"docs":{},"a":{"docs":{},"r":{"docs":{},"d":{"docs":{"index.html#plan-stability-and-versioning":{"ref":"index.html#plan-stability-and-versioning","tf":0.0425531914893617}}}}}},"e":{"docs":{},"n":{"docs":{},"d":{"docs":{"index.html#service-building-guidelines":{"ref":"index.html#service-building-guidelines","tf":0.01818181818181818}}}}}}}}},"l":{"docs":{},"o":{"docs":{},"g":{"docs":{"index.html#provide-request-ids-for-introspection":{"ref":"index.html#provide-request-ids-for-introspection","tf":0.045454545454545456}},"i":{"docs":{},"c":{"docs":{"index.html#goal-of-the-document":{"ref":"index.html#goal-of-the-document","tf":0.02040816326530612}}}}},"o":{"docs":{},"k":{"docs":{"index.html#goal-of-the-document":{"ref":"index.html#goal-of-the-document","tf":0.02040816326530612}}}},"c":{"docs":{},"a":{"docs":{},"l":{"docs":{"index.html#provide-certain-mandatory-artifactsactions":{"ref":"index.html#provide-certain-mandatory-artifactsactions","tf":0.018867924528301886}}},"t":{"docs":{"index.html#minimize-path-nesting":{"ref":"index.html#minimize-path-nesting","tf":0.021739130434782608},"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294}}}}},"t":{"docs":{"index.html#use-consistent-query-parameter-types":{"ref":"index.html#use-consistent-query-parameter-types","tf":0.02702702702702703}}},"n":{"docs":{},"g":{"docs":{"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.009259259259259259}}}}},"a":{"docs":{},"t":{"docs":{},"e":{"docs":{},"s":{"docs":{},"t":{"docs":{"index.html#provide-certain-mandatory-artifactsactions":{"ref":"index.html#provide-certain-mandatory-artifactsactions","tf":0.018867924528301886}}}},"r":{"docs":{"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294},"index.html#service-has-a-single-responsibility":{"ref":"index.html#service-has-a-single-responsibility","tf":0.027777777777777776}}}}},"n":{"docs":{},"g":{"docs":{},"u":{"docs":{},"a":{"docs":{},"g":{"docs":{"index.html#provide-human-readable-documentation-via-api-connect":{"ref":"index.html#provide-human-readable-documentation-via-api-connect","tf":0.029411764705882353},"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.009259259259259259}}}}}}},"y":{"docs":{},"o":{"docs":{},"u":{"docs":{},"t":{"docs":{"index.html#special-action-endpoints":{"ref":"index.html#special-action-endpoints","tf":0.034482758620689655}}}}}},"r":{"docs":{},"g":{"docs":{"index.html#divide-large-responses-across-requests-with-ranges":{"ref":"index.html#divide-large-responses-across-requests-with-ranges","tf":2.0357142857142856}},"e":{"docs":{},"r":{"docs":{"index.html#separate-concerns":{"ref":"index.html#separate-concerns","tf":0.017857142857142856}}}}}},"s":{"docs":{},"t":{"docs":{},"l":{"docs":{},"o":{"docs":{},"g":{"docs":{},"i":{"docs":{},"n":{"docs":{"index.html#gzip-and-keep-json-minified-in-all-responses":{"ref":"index.html#gzip-and-keep-json-minified-in-all-responses","tf":0.016129032258064516}}}}}}}}}},"e":{"docs":{},"v":{"docs":{},"e":{"docs":{},"l":{"docs":{"index.html#minimize-path-nesting":{"ref":"index.html#minimize-path-nesting","tf":0.021739130434782608},"index.html#(todo)-use-_link-for-foreign-key-relations":{"ref":"index.html#(todo)-use-_link-for-foreign-key-relations","tf":0.013888888888888888}}}}}},"i":{"docs":{},"m":{"docs":{},"i":{"docs":{},"t":{"docs":{"index.html#minimize-path-nesting":{"ref":"index.html#minimize-path-nesting","tf":0.021739130434782608},"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294},"index.html#divide-large-responses-across-requests-with-ranges":{"ref":"index.html#divide-large-responses-across-requests-with-ranges","tf":0.03571428571428571},"index.html#delegate-common-service-needs-to-an-api-gateway":{"ref":"index.html#delegate-common-service-needs-to-an-api-gateway","tf":0.047619047619047616}}}}},"f":{"docs":{},"e":{"docs":{},"c":{"docs":{},"y":{"docs":{},"c":{"docs":{},"l":{"docs":{"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.009259259259259259}}}}}}}},"v":{"docs":{},"e":{"docs":{"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.009259259259259259}}}},"e":{"docs":{},"l":{"docs":{},"a":{"docs":{},"h":{"docs":{},"t":{"docs":{},"i":{"docs":{"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.026785714285714284}},"@":{"docs":{},"k":{"docs":{"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428}}}}}}}}}},"n":{"docs":{},"k":{"docs":{"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.03571428571428571},"index.html#(todo)-use-_link-for-foreign-key-relations":{"ref":"index.html#(todo)-use-_link-for-foreign-key-relations","tf":0.013888888888888888}}}}},"d":{"docs":{"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":2.0267857142857144}},".":{"docs":{},"o":{"docs":{},"r":{"docs":{},"g":{"docs":{"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428}}}}}}},"u":{"docs":{},"n":{"docs":{},"c":{"docs":{},"h":{"docs":{},".":{"docs":{},"h":{"docs":{},"t":{"docs":{},"m":{"docs":{},"l":{"docs":{"index.html#service-building-guidelines":{"ref":"index.html#service-building-guidelines","tf":0.01818181818181818}}}}}}}}}}}},"m":{"docs":{},"o":{"docs":{},"r":{"docs":{},"e":{"docs":{"index.html#goal-of-the-document":{"ref":"index.html#goal-of-the-document","tf":0.02040816326530612},"index.html#require-versioning-headers":{"ref":"index.html#require-versioning-headers","tf":0.03508771929824561},"index.html#separate-concerns":{"ref":"index.html#separate-concerns","tf":0.03571428571428571},"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.027777777777777776},"index.html#divide-large-responses-across-requests-with-ranges":{"ref":"index.html#divide-large-responses-across-requests-with-ranges","tf":0.03571428571428571},"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428},"index.html#(todo)-use-_link-for-foreign-key-relations":{"ref":"index.html#(todo)-use-_link-for-foreign-key-relations","tf":0.027777777777777776}}}},"d":{"docs":{},"i":{"docs":{},"f":{"docs":{},"i":{"docs":{"index.html#use-consistent-http-methods":{"ref":"index.html#use-consistent-http-methods","tf":0.023809523809523808}}}}},"e":{"docs":{},"l":{"docs":{"index.html#minimize-path-nesting":{"ref":"index.html#minimize-path-nesting","tf":0.021739130434782608},"index.html#service-has-a-single-responsibility":{"ref":"index.html#service-has-a-single-responsibility","tf":0.027777777777777776}}}}},"n":{"docs":{},"e":{"docs":{},"y":{"docs":{"index.html#use-json-naming-conventions":{"ref":"index.html#use-json-naming-conventions","tf":0.014285714285714285}}}},"i":{"docs":{},"t":{"docs":{},"o":{"docs":{},"r":{"docs":{"index.html#delegate-common-service-needs-to-an-api-gateway":{"ref":"index.html#delegate-common-service-needs-to-an-api-gateway","tf":0.047619047619047616}}}}}}},"v":{"docs":{},"e":{"docs":{"index.html#use-consistent-query-parameter-types":{"ref":"index.html#use-consistent-query-parameter-types","tf":0.02702702702702703}}}}},"a":{"docs":{},"i":{"docs":{},"n":{"docs":{},"t":{"docs":{},"a":{"docs":{},"i":{"docs":{},"n":{"docs":{"index.html#provide-certain-mandatory-artifactsactions":{"ref":"index.html#provide-certain-mandatory-artifactsactions","tf":0.018867924528301886},"index.html#use-swagger-2.0-to-describe-apis":{"ref":"index.html#use-swagger-2.0-to-describe-apis","tf":0.08},"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428}}}}}}}},"k":{"docs":{},"e":{"docs":{"index.html#provide-certain-mandatory-artifactsactions":{"ref":"index.html#provide-certain-mandatory-artifactsactions","tf":0.018867924528301886},"index.html#use-json-naming-conventions":{"ref":"index.html#use-json-naming-conventions","tf":0.014285714285714285},"index.html#provide-standard-timestamps":{"ref":"index.html#provide-standard-timestamps","tf":0.047619047619047616},"index.html#plan-stability-and-versioning":{"ref":"index.html#plan-stability-and-versioning","tf":0.0425531914893617},"index.html#(todo)-use-_link-for-foreign-key-relations":{"ref":"index.html#(todo)-use-_link-for-foreign-key-relations","tf":0.013888888888888888}}}},"n":{"docs":{},"d":{"docs":{},"a":{"docs":{},"t":{"docs":{},"o":{"docs":{},"r":{"docs":{},"i":{"docs":{"index.html#provide-certain-mandatory-artifactsactions":{"ref":"index.html#provide-certain-mandatory-artifactsactions","tf":2.5}}}}}}}},"u":{"docs":{},"a":{"docs":{},"l":{"docs":{"index.html#use-swagger-2.0-to-describe-apis":{"ref":"index.html#use-swagger-2.0-to-describe-apis","tf":0.04}}}}},"i":{"docs":{"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294},"index.html#gzip-and-keep-json-minified-in-all-responses":{"ref":"index.html#gzip-and-keep-json-minified-in-all-responses","tf":0.016129032258064516}}},"a":{"docs":{},"g":{"docs":{"index.html#plan-stability-and-versioning":{"ref":"index.html#plan-stability-and-versioning","tf":0.02127659574468085},"index.html#delegate-common-service-needs-to-an-api-gateway":{"ref":"index.html#delegate-common-service-needs-to-an-api-gateway","tf":0.047619047619047616}}}}},"c":{"docs":{},"h":{"docs":{},"i":{"docs":{},"n":{"docs":{"index.html#use-consistent-http-methods":{"ref":"index.html#use-consistent-http-methods","tf":0.011904761904761904}},"e":{"docs":{},"s":{"docs":{},"/":{"1":{"docs":{},"/":{"docs":{},"a":{"docs":{},"c":{"docs":{},"t":{"docs":{},"i":{"docs":{},"o":{"docs":{},"n":{"docs":{},"s":{"docs":{},"/":{"docs":{},"s":{"docs":{},"h":{"docs":{},"u":{"docs":{},"t":{"docs":{},"d":{"docs":{},"o":{"docs":{},"w":{"docs":{},"n":{"docs":{"index.html#special-action-endpoints":{"ref":"index.html#special-action-endpoints","tf":0.034482758620689655}}}}}}}}}}}}}}}}}}}},"docs":{}}}}}}}},"d":{"docs":{},"e":{"docs":{"index.html#separate-concerns":{"ref":"index.html#separate-concerns","tf":0.017857142857142856}}}},"t":{"docs":{},"c":{"docs":{},"h":{"docs":{"index.html#support-http-cache-headers":{"ref":"index.html#support-http-cache-headers","tf":0.027777777777777776}}}},"u":{"docs":{},"r":{"docs":{"index.html#plan-stability-and-versioning":{"ref":"index.html#plan-stability-and-versioning","tf":0.02127659574468085}}}}}},"e":{"docs":{},"c":{"docs":{},"h":{"docs":{},"a":{"docs":{},"n":{"docs":{"index.html#require-versioning-headers":{"ref":"index.html#require-versioning-headers","tf":0.017543859649122806},"index.html#provide-request-ids-for-introspection":{"ref":"index.html#provide-request-ids-for-introspection","tf":0.045454545454545456}}}}}},"t":{"docs":{},"a":{"docs":{},"d":{"docs":{},"a":{"docs":{},"t":{"docs":{},"a":{"docs":{"index.html#require-versioning-headers":{"ref":"index.html#require-versioning-headers","tf":0.017543859649122806},"index.html#separate-concerns":{"ref":"index.html#separate-concerns","tf":0.017857142857142856}}}}}}},"h":{"docs":{},"o":{"docs":{},"d":{"docs":{"index.html#use-consistent-http-methods":{"ref":"index.html#use-consistent-http-methods","tf":2.511904761904762},"index.html#special-action-endpoints":{"ref":"index.html#special-action-endpoints","tf":0.034482758620689655}}}}}},"s":{"docs":{},"s":{"docs":{},"a":{"docs":{},"g":{"docs":{"index.html#respond-structured-and-consistent-errors":{"ref":"index.html#respond-structured-and-consistent-errors","tf":0.05405405405405406},"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":1.6666666666666665}}}}}},"a":{"docs":{},"n":{"docs":{"index.html#separate-concerns":{"ref":"index.html#separate-concerns","tf":0.017857142857142856},"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428}}}}},"i":{"docs":{},"t":{"docs":{},"i":{"docs":{},"g":{"docs":{"index.html#require-versioning-headers":{"ref":"index.html#require-versioning-headers","tf":0.017543859649122806}}}}},"n":{"docs":{},"i":{"docs":{},"m":{"docs":{"index.html#minimize-path-nesting":{"ref":"index.html#minimize-path-nesting","tf":3.333333333333333}},"u":{"docs":{},"m":{"docs":{"index.html#services-should-have-multiple-environments":{"ref":"index.html#services-should-have-multiple-environments","tf":0.017241379310344827}}}}},"f":{"docs":{},"i":{"docs":{"index.html#gzip-and-keep-json-minified-in-all-responses":{"ref":"index.html#gzip-and-keep-json-minified-in-all-responses","tf":2.0161290322580645}}}}}},"s":{"docs":{},"s":{"docs":{"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294}}}},"l":{"docs":{},"l":{"docs":{},"i":{"docs":{},"s":{"docs":{},"e":{"docs":{},"c":{"docs":{},"o":{"docs":{},"n":{"docs":{},"d":{"docs":{"index.html#use-utc-times-formatted-in-iso8601":{"ref":"index.html#use-utc-times-formatted-in-iso8601","tf":0.06666666666666667}}}}}}}}}}},"c":{"docs":{},"r":{"docs":{},"o":{"docs":{},"s":{"docs":{},"e":{"docs":{},"r":{"docs":{},"v":{"docs":{},"i":{"docs":{},"c":{"docs":{"index.html#service-building-guidelines":{"ref":"index.html#service-building-guidelines","tf":0.03636363636363636},"index.html#design-for-failures":{"ref":"index.html#design-for-failures","tf":0.08333333333333333},"index.html#delegate-common-service-needs-to-an-api-gateway":{"ref":"index.html#delegate-common-service-needs-to-an-api-gateway","tf":0.047619047619047616}}}}}}}}}}}},"u":{"docs":{},"l":{"docs":{},"t":{"docs":{},"i":{"docs":{},"p":{"docs":{},"l":{"docs":{"index.html#use-swagger-2.0-to-describe-apis":{"ref":"index.html#use-swagger-2.0-to-describe-apis","tf":0.04},"index.html#use-consistent-http-methods":{"ref":"index.html#use-consistent-http-methods","tf":0.011904761904761904},"index.html#follow-naming-conventions":{"ref":"index.html#follow-naming-conventions","tf":0.02702702702702703},"index.html#provide-resource-(uu)ids":{"ref":"index.html#provide-resource-(uu)ids","tf":0.011494252873563218},"index.html#divide-large-responses-across-requests-with-ranges":{"ref":"index.html#divide-large-responses-across-requests-with-ranges","tf":0.03571428571428571},"index.html#services-should-have-multiple-environments":{"ref":"index.html#services-should-have-multiple-environments","tf":3.333333333333333}}}}}}},"c":{"docs":{},"h":{"docs":{"index.html#follow-naming-conventions":{"ref":"index.html#follow-naming-conventions","tf":0.02702702702702703}}}}}},"n":{"docs":{},"e":{"docs":{},"c":{"docs":{},"e":{"docs":{},"s":{"docs":{},"s":{"docs":{},"a":{"docs":{},"r":{"docs":{},"i":{"docs":{},"l":{"docs":{},"i":{"docs":{"index.html#goal-of-the-document":{"ref":"index.html#goal-of-the-document","tf":0.02040816326530612}}}}}}}}}}},"w":{"docs":{"index.html#provide-certain-mandatory-artifactsactions":{"ref":"index.html#provide-certain-mandatory-artifactsactions","tf":0.03773584905660377},"index.html#use-consistent-http-methods":{"ref":"index.html#use-consistent-http-methods","tf":0.023809523809523808},"index.html#follow-naming-conventions":{"ref":"index.html#follow-naming-conventions","tf":0.02702702702702703},"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.011299435028248588},"index.html#plan-stability-and-versioning":{"ref":"index.html#plan-stability-and-versioning","tf":0.02127659574468085},"index.html#services-should-have-multiple-environments":{"ref":"index.html#services-should-have-multiple-environments","tf":0.017241379310344827}},"l":{"docs":{},"i":{"docs":{"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294}}}}},"e":{"docs":{},"d":{"docs":{"index.html#special-action-endpoints":{"ref":"index.html#special-action-endpoints","tf":0.06896551724137931},"index.html#use-consistent-query-parameter-types":{"ref":"index.html#use-consistent-query-parameter-types","tf":0.02702702702702703},"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.009259259259259259},"index.html#plan-stability-and-versioning":{"ref":"index.html#plan-stability-and-versioning","tf":0.02127659574468085},"index.html#(todo)-use-_link-for-foreign-key-relations":{"ref":"index.html#(todo)-use-_link-for-foreign-key-relations","tf":0.013888888888888888},"index.html#delegate-common-service-needs-to-an-api-gateway":{"ref":"index.html#delegate-common-service-needs-to-an-api-gateway","tf":1.6666666666666665}},"l":{"docs":{},"e":{"docs":{},"s":{"docs":{},"s":{"docs":{"index.html#gzip-and-keep-json-minified-in-all-responses":{"ref":"index.html#gzip-and-keep-json-minified-in-all-responses","tf":0.016129032258064516}}}}}}}},"s":{"docs":{},"t":{"docs":{"index.html#minimize-path-nesting":{"ref":"index.html#minimize-path-nesting","tf":3.4202898550724634},"index.html#(todo)-use-_link-for-foreign-key-relations":{"ref":"index.html#(todo)-use-_link-for-foreign-key-relations","tf":0.013888888888888888}}}},"t":{"docs":{},"f":{"docs":{},"l":{"docs":{},"i":{"docs":{},"x":{"docs":{"index.html#service-building-guidelines":{"ref":"index.html#service-building-guidelines","tf":0.01818181818181818}}}}}}}},"o":{"docs":{},"n":{"docs":{"index.html#require-https":{"ref":"index.html#require-https","tf":0.014705882352941176}},"e":{"docs":{"index.html#support-http-cache-headers":{"ref":"index.html#support-http-cache-headers","tf":0.027777777777777776}}}},"t":{"docs":{},"e":{"docs":{"index.html#use-consistent-http-methods":{"ref":"index.html#use-consistent-http-methods","tf":0.011904761904761904},"index.html#use-consistent-query-parameter-types":{"ref":"index.html#use-consistent-query-parameter-types","tf":0.02702702702702703}}}},"r":{"docs":{},"m":{"docs":{},"a":{"docs":{},"l":{"docs":{"index.html#design-for-failures":{"ref":"index.html#design-for-failures","tf":0.041666666666666664}}}}}}},"a":{"docs":{},"m":{"docs":{},"e":{"docs":{"index.html#accept-serialized-json-in-request-bodies":{"ref":"index.html#accept-serialized-json-in-request-bodies","tf":0.043478260869565216},"index.html#follow-naming-conventions":{"ref":"index.html#follow-naming-conventions","tf":3.333333333333333},"index.html#use-json-naming-conventions":{"ref":"index.html#use-json-naming-conventions","tf":2.557142857142857},"index.html#downcase-and-dash-separated-paths":{"ref":"index.html#downcase-and-dash-separated-paths","tf":0.07142857142857142},"index.html#camelcase-query-parameters":{"ref":"index.html#camelcase-query-parameters","tf":0.14285714285714285},"index.html#use-consistent-query-parameter-types":{"ref":"index.html#use-consistent-query-parameter-types","tf":0.02702702702702703},"index.html#resource-names":{"ref":"index.html#resource-names","tf":5.045454545454546},"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.017857142857142856},"index.html#(todo)-use-_link-for-foreign-key-relations":{"ref":"index.html#(todo)-use-_link-for-foreign-key-relations","tf":0.05555555555555555}}}}},"u":{"docs":{},"m":{"docs":{},"b":{"docs":{},"e":{"docs":{},"r":{"docs":{"index.html#use-json-naming-conventions":{"ref":"index.html#use-json-naming-conventions","tf":0.02857142857142857},"index.html#plan-stability-and-versioning":{"ref":"index.html#plan-stability-and-versioning","tf":0.02127659574468085}}}}}}}},"j":{"docs":{},"o":{"docs":{},"i":{"docs":{},"n":{"docs":{"index.html#provide-certain-mandatory-artifactsactions":{"ref":"index.html#provide-certain-mandatory-artifactsactions","tf":0.018867924528301886}}}},"b":{"docs":{"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.06481481481481481}}}},"s":{"docs":{},"o":{"docs":{},"n":{"docs":{"index.html#accept-serialized-json-in-request-bodies":{"ref":"index.html#accept-serialized-json-in-request-bodies","tf":2.0434782608695654},"index.html#use-json-naming-conventions":{"ref":"index.html#use-json-naming-conventions","tf":2.5285714285714285},"index.html#use-consistent-query-parameter-types":{"ref":"index.html#use-consistent-query-parameter-types","tf":0.02702702702702703},"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294},"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":2.0357142857142856},"index.html#gzip-and-keep-json-minified-in-all-responses":{"ref":"index.html#gzip-and-keep-json-minified-in-all-responses","tf":2.032258064516129}}}}}},"r":{"docs":{},"e":{"docs":{},"q":{"docs":{},"u":{"docs":{},"i":{"docs":{},"r":{"docs":{"index.html#provide-certain-mandatory-artifactsactions":{"ref":"index.html#provide-certain-mandatory-artifactsactions","tf":0.018867924528301886},"index.html#require-versioning-headers":{"ref":"index.html#require-versioning-headers","tf":3.350877192982456},"index.html#require-https":{"ref":"index.html#require-https","tf":5.029411764705882},"index.html#respond-structured-and-consistent-errors":{"ref":"index.html#respond-structured-and-consistent-errors","tf":0.02702702702702703},"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294},"index.html#services-are-independent":{"ref":"index.html#services-are-independent","tf":0.023809523809523808}}}},"e":{"docs":{},"s":{"docs":{},"t":{"docs":{"index.html#require-versioning-headers":{"ref":"index.html#require-versioning-headers","tf":0.017543859649122806},"index.html#require-https":{"ref":"index.html#require-https","tf":0.029411764705882353},"index.html#provide-human-readable-documentation-via-api-connect":{"ref":"index.html#provide-human-readable-documentation-via-api-connect","tf":0.029411764705882353},"index.html#accept-serialized-json-in-request-bodies":{"ref":"index.html#accept-serialized-json-in-request-bodies","tf":2.0217391304347827},"index.html#use-consistent-http-methods":{"ref":"index.html#use-consistent-http-methods","tf":0.03571428571428571},"index.html#use-consistent-query-parameter-types":{"ref":"index.html#use-consistent-query-parameter-types","tf":0.05405405405405406},"index.html#respond-structured-and-consistent-errors":{"ref":"index.html#respond-structured-and-consistent-errors","tf":0.05405405405405406},"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.062146892655367235},"index.html#separate-concerns":{"ref":"index.html#separate-concerns","tf":0.03571428571428571},"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":1.6851851851851851},"index.html#divide-large-responses-across-requests-with-ranges":{"ref":"index.html#divide-large-responses-across-requests-with-ranges","tf":2.0714285714285716},"index.html#provide-request-ids-for-introspection":{"ref":"index.html#provide-request-ids-for-introspection","tf":2.590909090909091},"index.html#support-http-cache-headers":{"ref":"index.html#support-http-cache-headers","tf":0.027777777777777776},"index.html#gzip-and-keep-json-minified-in-all-responses":{"ref":"index.html#gzip-and-keep-json-minified-in-all-responses","tf":0.016129032258064516},"index.html#provide-full-resources-where-available":{"ref":"index.html#provide-full-resources-where-available","tf":0.014925373134328358}}}}}}},"d":{"docs":{},"i":{"docs":{"index.html#services-are-independent":{"ref":"index.html#services-are-independent","tf":0.023809523809523808}},"r":{"docs":{},"e":{"docs":{},"c":{"docs":{},"t":{"docs":{"index.html#require-https":{"ref":"index.html#require-https","tf":0.029411764705882353}}}}}}}},"j":{"docs":{},"e":{"docs":{},"c":{"docs":{},"t":{"docs":{"index.html#require-https":{"ref":"index.html#require-https","tf":0.014705882352941176}}}}}},"l":{"docs":{},"i":{"docs":{"index.html#require-https":{"ref":"index.html#require-https","tf":0.014705882352941176}}},"a":{"docs":{},"t":{"docs":{"index.html#(todo)-use-_link-for-foreign-key-relations":{"ref":"index.html#(todo)-use-_link-for-foreign-key-relations","tf":1.6805555555555554}},"i":{"docs":{},"o":{"docs":{},"n":{"docs":{},"s":{"docs":{},"h":{"docs":{},"i":{"docs":{},"p":{"docs":{"index.html#minimize-path-nesting":{"ref":"index.html#minimize-path-nesting","tf":0.043478260869565216},"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428}}}}}}}}}}}},"n":{"docs":{},"d":{"docs":{},"e":{"docs":{},"r":{"docs":{"index.html#require-https":{"ref":"index.html#require-https","tf":0.014705882352941176},"index.html#use-utc-times-formatted-in-iso8601":{"ref":"index.html#use-utc-times-formatted-in-iso8601","tf":0.06666666666666667},"index.html#provide-resource-(uu)ids":{"ref":"index.html#provide-resource-(uu)ids","tf":0.011494252873563218}}}}}},"s":{"docs":{},"p":{"docs":{},"o":{"docs":{},"n":{"docs":{},"d":{"docs":{"index.html#require-https":{"ref":"index.html#require-https","tf":0.029411764705882353},"index.html#respond-structured-and-consistent-errors":{"ref":"index.html#respond-structured-and-consistent-errors","tf":2.5}}},"s":{"docs":{"index.html#provide-human-readable-documentation-via-api-connect":{"ref":"index.html#provide-human-readable-documentation-via-api-connect","tf":0.029411764705882353},"index.html#accept-serialized-json-in-request-bodies":{"ref":"index.html#accept-serialized-json-in-request-bodies","tf":0.021739130434782608},"index.html#respond-structured-and-consistent-errors":{"ref":"index.html#respond-structured-and-consistent-errors","tf":0.02702702702702703},"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.022598870056497175},"index.html#separate-concerns":{"ref":"index.html#separate-concerns","tf":0.03571428571428571},"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.027777777777777776},"index.html#divide-large-responses-across-requests-with-ranges":{"ref":"index.html#divide-large-responses-across-requests-with-ranges","tf":2.0714285714285716},"index.html#provide-request-ids-for-introspection":{"ref":"index.html#provide-request-ids-for-introspection","tf":0.045454545454545456},"index.html#support-http-cache-headers":{"ref":"index.html#support-http-cache-headers","tf":0.027777777777777776},"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428},"index.html#gzip-and-keep-json-minified-in-all-responses":{"ref":"index.html#gzip-and-keep-json-minified-in-all-responses","tf":2.0483870967741935},"index.html#provide-full-resources-where-available":{"ref":"index.html#provide-full-resources-where-available","tf":0.04477611940298507},"index.html#(todo)-use-_link-for-foreign-key-relations":{"ref":"index.html#(todo)-use-_link-for-foreign-key-relations","tf":0.027777777777777776},"index.html#service-has-a-single-responsibility":{"ref":"index.html#service-has-a-single-responsibility","tf":3.3611111111111107},"index.html#services-should-have-multiple-environments":{"ref":"index.html#services-should-have-multiple-environments","tf":0.017241379310344827}}}}}},"o":{"docs":{},"u":{"docs":{},"r":{"docs":{},"c":{"docs":{"index.html#use-consistent-http-methods":{"ref":"index.html#use-consistent-http-methods","tf":0.09523809523809523},"index.html#special-action-endpoints":{"ref":"index.html#special-action-endpoints","tf":0.034482758620689655},"index.html#minimize-path-nesting":{"ref":"index.html#minimize-path-nesting","tf":0.043478260869565216},"index.html#resource-names":{"ref":"index.html#resource-names","tf":5.136363636363637},"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.03389830508474576},"index.html#provide-resource-(uu)ids":{"ref":"index.html#provide-resource-(uu)ids","tf":3.390804597701149},"index.html#separate-concerns":{"ref":"index.html#separate-concerns","tf":0.017857142857142856},"index.html#support-http-cache-headers":{"ref":"index.html#support-http-cache-headers","tf":0.05555555555555555},"index.html#provide-full-resources-where-available":{"ref":"index.html#provide-full-resources-where-available","tf":2.544776119402985},"index.html#provide-standard-timestamps":{"ref":"index.html#provide-standard-timestamps","tf":0.09523809523809523},"index.html#(todo)-use-_link-for-foreign-key-relations":{"ref":"index.html#(todo)-use-_link-for-foreign-key-relations","tf":0.013888888888888888},"index.html#service-building-guidelines":{"ref":"index.html#service-building-guidelines","tf":0.01818181818181818},"index.html#services-are-independent":{"ref":"index.html#services-are-independent","tf":0.023809523809523808}},"e":{"docs":{},"s":{"docs":{},"/":{"docs":{},":":{"docs":{},"r":{"docs":{},"e":{"docs":{},"s":{"docs":{},"o":{"docs":{},"u":{"docs":{},"r":{"docs":{},"c":{"docs":{},"e":{"docs":{},"/":{"docs":{},"a":{"docs":{},"c":{"docs":{},"t":{"docs":{},"i":{"docs":{},"o":{"docs":{},"n":{"docs":{},"s":{"docs":{},"/":{"docs":{},":":{"docs":{},"a":{"docs":{},"c":{"docs":{},"t":{"docs":{"index.html#special-action-endpoints":{"ref":"index.html#special-action-endpoints","tf":0.034482758620689655}}}}}}}}}}}}}}}}}}}}}}}}}}}}}},"l":{"docs":{},"u":{"docs":{},"t":{"docs":{"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.009259259259259259}}}}}},"u":{"docs":{},"l":{"docs":{},"t":{"docs":{"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428}}}}}},"a":{"docs":{},"d":{"docs":{"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.009259259259259259},"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428}},"a":{"docs":{},"b":{"docs":{},"l":{"docs":{"index.html#provide-human-readable-documentation-via-api-connect":{"ref":"index.html#provide-human-readable-documentation-via-api-connect","tf":1.4285714285714284},"index.html#respond-structured-and-consistent-errors":{"ref":"index.html#respond-structured-and-consistent-errors","tf":0.02702702702702703}}}}},"i":{"docs":{"index.html#plan-stability-and-versioning":{"ref":"index.html#plan-stability-and-versioning","tf":0.02127659574468085}}}},"s":{"docs":{},"o":{"docs":{},"n":{"docs":{"index.html#provide-resource-(uu)ids":{"ref":"index.html#provide-resource-(uu)ids","tf":0.011494252873563218}}}}},"l":{"docs":{"index.html#services-should-have-multiple-environments":{"ref":"index.html#services-should-have-multiple-environments","tf":0.017241379310344827}}}},"p":{"docs":{},"l":{"docs":{},"a":{"docs":{},"c":{"docs":{"index.html#use-consistent-http-methods":{"ref":"index.html#use-consistent-http-methods","tf":0.023809523809523808}}}}},"o":{"docs":{},"r":{"docs":{},"t":{"docs":{"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294}}}}},"r":{"docs":{},"e":{"docs":{},"s":{"docs":{},"e":{"docs":{},"n":{"docs":{},"t":{"docs":{"index.html#provide-full-resources-where-available":{"ref":"index.html#provide-full-resources-where-available","tf":0.029850746268656716}}}}}}}}},"f":{"docs":{},"e":{"docs":{},"r":{"docs":{"index.html#resource-names":{"ref":"index.html#resource-names","tf":0.045454545454545456},"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294},"index.html#(todo)-use-_link-for-foreign-key-relations":{"ref":"index.html#(todo)-use-_link-for-foreign-key-relations","tf":0.013888888888888888}},"e":{"docs":{},"n":{"docs":{},"c":{"docs":{"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428}}}}}}}},"t":{"docs":{},"r":{"docs":{},"i":{"docs":{"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294},"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.009259259259259259}},"e":{"docs":{},"v":{"docs":{"index.html#divide-large-responses-across-requests-with-ranges":{"ref":"index.html#divide-large-responses-across-requests-with-ranges","tf":0.03571428571428571}}}}}},"u":{"docs":{},"r":{"docs":{},"n":{"docs":{"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":2.516949152542373},"index.html#use-utc-times-formatted-in-iso8601":{"ref":"index.html#use-utc-times-formatted-in-iso8601","tf":0.06666666666666667},"index.html#support-http-cache-headers":{"ref":"index.html#support-http-cache-headers","tf":0.027777777777777776},"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428}}}}}},"c":{"docs":{},"o":{"docs":{},"m":{"docs":{},"m":{"docs":{},"e":{"docs":{},"n":{"docs":{},"d":{"docs":{"index.html#support-http-cache-headers":{"ref":"index.html#support-http-cache-headers","tf":0.027777777777777776}}}}}}}}}},"u":{"docs":{},"n":{"docs":{"index.html#provide-certain-mandatory-artifactsactions":{"ref":"index.html#provide-certain-mandatory-artifactsactions","tf":0.03773584905660377},"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.009259259259259259}}},"l":{"docs":{},"e":{"docs":{"index.html#follow-naming-conventions":{"ref":"index.html#follow-naming-conventions","tf":0.02702702702702703},"index.html#separate-concerns":{"ref":"index.html#separate-concerns","tf":0.017857142857142856},"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.009259259259259259},"index.html#service-building-guidelines":{"ref":"index.html#service-building-guidelines","tf":0.01818181818181818}}}}},"o":{"docs":{},"o":{"docs":{},"t":{"docs":{"index.html#minimize-path-nesting":{"ref":"index.html#minimize-path-nesting","tf":0.021739130434782608}}}},"b":{"docs":{},"u":{"docs":{},"s":{"docs":{},"t":{"docs":{"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.009259259259259259}}}}}}},"a":{"docs":{},"n":{"docs":{},"g":{"docs":{"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294},"index.html#divide-large-responses-across-requests-with-ranges":{"ref":"index.html#divide-large-responses-across-requests-with-ranges","tf":2.0714285714285716}}}},"t":{"docs":{},"e":{"docs":{"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294},"index.html#delegate-common-service-needs-to-an-api-gateway":{"ref":"index.html#delegate-common-service-needs-to-an-api-gateway","tf":0.047619047619047616}}}},"u":{"docs":{},"t":{"docs":{},"a":{"docs":{"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.026785714285714284}},".":{"docs":{},"f":{"docs":{},"i":{"docs":{"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428}}}}}}}},"p":{"docs":{},"i":{"docs":{},"d":{"docs":{"index.html#services-should-have-multiple-environments":{"ref":"index.html#services-should-have-multiple-environments","tf":0.017241379310344827}}}}}},"i":{"docs":{},"c":{"docs":{},"h":{"docs":{"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":0.008928571428571428}}}}}},"v":{"docs":{},"a":{"docs":{},"g":{"docs":{},"r":{"docs":{},"a":{"docs":{},"n":{"docs":{},"t":{"docs":{"index.html#provide-certain-mandatory-artifactsactions":{"ref":"index.html#provide-certain-mandatory-artifactsactions","tf":0.018867924528301886}}}}}}},"l":{"docs":{},"u":{"docs":{"index.html#use-json-naming-conventions":{"ref":"index.html#use-json-naming-conventions","tf":0.014285714285714285},"index.html#provide-request-ids-for-introspection":{"ref":"index.html#provide-request-ids-for-introspection","tf":0.09090909090909091},"index.html#support-http-cache-headers":{"ref":"index.html#support-http-cache-headers","tf":0.027777777777777776}}},"i":{"docs":{},"d":{"docs":{"index.html#respond-structured-and-consistent-errors":{"ref":"index.html#respond-structured-and-consistent-errors","tf":0.02702702702702703},"index.html#return-appropriate-status-codes":{"ref":"index.html#return-appropriate-status-codes","tf":0.005649717514124294}}}}},"r":{"docs":{},"i":{"docs":{},"o":{"docs":{},"u":{"docs":{"index.html#plan-stability-and-versioning":{"ref":"index.html#plan-stability-and-versioning","tf":0.02127659574468085}}}}}}},"i":{"docs":{},"a":{"docs":{"index.html#provide-certain-mandatory-artifactsactions":{"ref":"index.html#provide-certain-mandatory-artifactsactions","tf":0.018867924528301886},"index.html#provide-human-readable-documentation-via-api-connect":{"ref":"index.html#provide-human-readable-documentation-via-api-connect","tf":1.4285714285714284}}},"r":{"docs":{},"t":{"docs":{},"u":{"docs":{},"a":{"docs":{},"l":{"docs":{"index.html#use-consistent-http-methods":{"ref":"index.html#use-consistent-http-methods","tf":0.011904761904761904}}}}}}},"d":{"docs":{},"e":{"docs":{},"o":{"docs":{"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":0.009259259259259259}}}}}},"e":{"docs":{},"r":{"docs":{},"i":{"docs":{"index.html#require-versioning-headers":{"ref":"index.html#require-versioning-headers","tf":0.017543859649122806},"index.html#provide-resource-(uu)ids":{"ref":"index.html#provide-resource-(uu)ids","tf":0.011494252873563218}}},"s":{"docs":{},"i":{"docs":{},"o":{"docs":{},"n":{"docs":{"index.html#require-versioning-headers":{"ref":"index.html#require-versioning-headers","tf":3.4385964912280698},"index.html#(todo)-when-and-how-to-bump-api-version":{"ref":"index.html#(todo)-when-and-how-to-bump-api-version","tf":2.75},"index.html#provide-human-readable-documentation-via-api-connect":{"ref":"index.html#provide-human-readable-documentation-via-api-connect","tf":0.058823529411764705},"index.html#resource-names":{"ref":"index.html#resource-names","tf":0.045454545454545456},"index.html#support-http-cache-headers":{"ref":"index.html#support-http-cache-headers","tf":0.027777777777777776},"index.html#plan-stability-and-versioning":{"ref":"index.html#plan-stability-and-versioning","tf":3.3758865248226946},"index.html#services-are-independent":{"ref":"index.html#services-are-independent","tf":0.023809523809523808}},"=":{"3":{"docs":{"index.html#require-versioning-headers":{"ref":"index.html#require-versioning-headers","tf":0.017543859649122806}}},"docs":{}}}}}}}},"o":{"docs":{},"c":{"docs":{},"a":{"docs":{},"b":{"docs":{},"u":{"docs":{},"l":{"docs":{},"a":{"docs":{},"r":{"docs":{},"i":{"docs":{"index.html#use-json-ld-with-schema.org-vocabulary":{"ref":"index.html#use-json-ld-with-schema.org-vocabulary","tf":2.0089285714285716}}}}}}}}}}}},"y":{"docs":{},"a":{"docs":{},"m":{"docs":{},"l":{"docs":{"index.html#provide-certain-mandatory-artifactsactions":{"ref":"index.html#provide-certain-mandatory-artifactsactions","tf":0.03773584905660377},"index.html#use-swagger-2.0-to-describe-apis":{"ref":"index.html#use-swagger-2.0-to-describe-apis","tf":0.04}}}}}},"z":{"docs":{},"a":{"docs":{},"l":{"docs":{},"a":{"docs":{},"n":{"docs":{},"d":{"docs":{},"o":{"docs":{"index.html#require-versioning-headers":{"ref":"index.html#require-versioning-headers","tf":0.017543859649122806},"index.html#(todo)-when-and-how-to-bump-api-version":{"ref":"index.html#(todo)-when-and-how-to-bump-api-version","tf":0.25}}}}}}}}},"x":{"docs":{"index.html#accept-serialized-json-in-request-bodies":{"ref":"index.html#accept-serialized-json-in-request-bodies","tf":0.021739130434782608},"index.html#provide-full-resources-where-available":{"ref":"index.html#provide-full-resources-where-available","tf":0.029850746268656716}}},"_":{"docs":{},"l":{"docs":{},"i":{"docs":{},"n":{"docs":{},"k":{"docs":{"index.html#use-json-naming-conventions":{"ref":"index.html#use-json-naming-conventions","tf":0.02857142857142857},"index.html#(todo)-use-_link-for-foreign-key-relations":{"ref":"index.html#(todo)-use-_link-for-foreign-key-relations","tf":1.6805555555555554}}}}}}},"q":{"docs":{},"u":{"docs":{},"e":{"docs":{},"r":{"docs":{},"i":{"docs":{"index.html#camelcase-query-parameters":{"ref":"index.html#camelcase-query-parameters","tf":3.476190476190476},"index.html#use-consistent-query-parameter-types":{"ref":"index.html#use-consistent-query-parameter-types","tf":2.054054054054054},"index.html#separate-concerns":{"ref":"index.html#separate-concerns","tf":0.017857142857142856}}}},"s":{"docs":{},"t":{"docs":{},"i":{"docs":{},"o":{"docs":{},"n":{"docs":{"index.html#resource-names":{"ref":"index.html#resource-names","tf":0.045454545454545456}}}}}}},"u":{"docs":{},"e":{"docs":{"index.html#use-message-queue-architecture-in-heavy-requests":{"ref":"index.html#use-message-queue-architecture-in-heavy-requests","tf":1.7129629629629628}}}}}},"a":{"docs":{"index.html#services-should-have-multiple-environments":{"ref":"index.html#services-should-have-multiple-environments","tf":0.034482758620689655}}}}},"length":1565},"corpusTokens":["01","010","0123","0123123191998","0123123191999","01234567","01t12:00:00z","01t12:00:00z\",\"createdat\":\"2012","01t12:00:00z\",\"updatedat\":\"2012","01t13:00:00z","0300","10","100m","12","123e4567","12d3","1991","2.0","200","201","2012","202","206","33400","3rd","4","400","401","403","422","426655440000","426655440003","429","456789abcdef","456789abcdef\",\"lastlogin\":\"2012","500","500m","538","5d8201b0","71ee1997776c#.d3wax578u","8","80","89ab","9.4","_link","a456","a=1","a=fals","a=tru","abov","accept","access","accompani","accord","acknowledg","action","actual","add","addit","address","addresscountri","addressloc","advic","affect","against","aim","alert","alic","alice@heroku.com","align","allow","alreadi","alway","and/or","anoth","api","api.com/app","api.com/us","api/product","api/products/:id","api/servers/:id/actions/hibern","app","appli","application/json","application/json;charset=utf","approach","appropri","architectur","array","artifacts/act","aspect","assort","assortments/:assortmentid","assortments/:assortmentid/product","assum","asynchron","attach","attent","attribut","authent","author","auto","automat","avail","avoid","back","backend","background","backward","bad","becom","befor","behaviour","belong","benefit","best","beta","beta\":false,\"email\":\"alice@heroku.com\",\"id\":\"01234567","better","between","bikeshed","birthyear","bodi","boolean","boom","bound","branchcod","break","broader","broken","build","built","bullet","bump","busi","cach","call","camelcas","capabl","carefulli","case","cdef","certain","challeng","chang","check","child","choic","choos","clear","clearli","client","close","code","collect","common","commun","compat","complet","complex","compress","concern","configur","connect","consid","consist","consumpt","contain","content","context","contradictori","convent","convey","correct","correctli","cpu","creat","createdat","curl","custom","cycl","d","danger","dash","data","databas","deal","debug","declar","decoupl","deepli","default","defin","deleg","delet","delin","demoapp","dependencies(postgr","deploy","depth","describ","descript","design","desir","detail","determin","dev","develop","diagnos","differ","difficult","discourag","discuss","dispos","divers","divid","docker","docpress","document","domain","don’t","doubl","down","downcas","dure","e.g","e89b","each","ean","easier","ecosystem","edg","elasticsearch","email","enabl","encod","end","enddat","endpoint","ensur","entiti","environ","error","especi","etag","etc","even","everyth","exampl","except","exchang","exist","expect","experiment","explain","expos","extend","extern","extra","extract","fail","failur","fals","fast","featur","fi","field","figur","finishedat","first","fit","fix","flag","flexibl","float","focu","focus","follow","forbidden","foreign","fork","form","format","framework","free","full","fulli","futur","gain","gateway","gener","gitbook","github","give","given","global","go","goal","good","googl","graph","greater","guid","guidanc","guidelin","gw","gzip","h","hapij","harder","hardwarestor","hascomment=false&minrating=1.2","hasoffercatalog","have","head","header","heavi","help","here","heroku","hibern","hierarch","horizont","hostnam","http","http/1.1","http://highscalability.com/blog/2014/4/8/microservic","http://json","http://schema.org","https://devcenter.heroku.com/articles/background","https://github.com/interagent/http","https://keskoapi.com/api/products/pk035","https://keskoapi.com/api/users/01234567","https://keskoapi.com/api/users/123e4567","https://medium.com/wso2","https://schema.org","https://service.com/app","https://service.com/apps/1f9b/domains/0fd4","https://service.com/apps/1f9b/dynos/05bd","https://www.ibm.com/support/knowledgecenter/sswhyp_4.0.0/com.ibm.apimgmt.apionprem.doc/tutorial_apionprem_security_oauth.html","https://www.nginx.com/blog/microservic","human","hundr","i.","ibm","id","id=1&id=2","ideal","ident","identifi","ids=1&ids=2","ids=1,2","implement","incid","includ","incompat","incorrectli","increas","increment","independ","indic","individu","info","inform","inlin","insecur","insight/guidelin","instanc","instead","integr","intern","introduc","introspect","invalid","io","iri","isadmin=tru","iso8601","issu","iter","it’","job","join","json","k","keep","kept","kesko","key","kickstart","known","languag","larg","larger","lastlogin","later","latest","layout","ld","ld.org","level","lielahti","lielahti@k","lifecycl","limit","link","live","local","locat","log","logic","long","look","lot","lunch.html","machin","machines/1/actions/shutdown","made","maintain","make","manag","mandatori","mani","manual","match","matur","mean","mechan","messag","metadata","method","microservic","millisecond","minifi","minim","minimum","miss","mitig","model","modifi","money","monitor","more","move","much","multipl","name","necessarili","need","needless","nest","netflix","new","newli","non","none","normal","note","number","object","offercatalog","ok","omit","on","onc","only/id","ontolog","open","openid","oper","order","origin","out","output","overal","overhead","overview","owner","ownerid","pagin","param","paramet","parent/child","part","parti","partial","particular","particularli","pass","patch","path","pay","payload","perfect","persist","pick","pictur","pk035","place","plan","platform","plural","plussacard","point","polici","poll","popul","port","possibl","post","postaladdress","postalcod","postgr","practic","prefer","prefix","prettifi","prevent","principl","problem","process","prod","product","products/:productid","products/actions/search","progress","project","prototype/development/product","provid","public","purpos","put","put/patch","put/patch/post","qa","queri","question","queue","rang","rapid","rate","rauta","rauta.fi","read","readabl","readi","real","reason","recommend","redi","redirect","refer","referenc","reject","relat","relationship","reli","render","replac","report","represent","request","requir","resolut","resourc","resources/:resource/actions/:act","respond","respons","result","retri","retriev","return","rich","robust","root","rule","run","same","scalabl","scale","schema","schema.org","scope","search","secur","see","select","semant","send","sens","sensit","separ","serial","serv","server","servic","service’","set","setup","share","shouldn’t","silver","similar","simpl","simpli","singl","singleton","singular","site","size","sloppy/bad","smell","someth","sourc","spec","special","specif","specifi","speed","split","stabil","stabl","standard","start","startdat","statu","statuscod","still","store","stores/:storeid","stores/:storeid/assort","stores/:storeid/assortments/:assortmentid/products/:productid","streetaddress","string","structur","subdomain.example.com","succeed","success","such","suit","suitabl","support","sure","surpris","swagger","symmetri","sync","synchron","system","take","taken","tamper","task","technolog","telephon","ten","test","thing","think","though","through","thumb","ticket","time","timestamp","tip","tl","todo","token","top","trace","traffic","transfer","transform","transit","treat","tri","trust","turvesuonkatu","type","unauthor","under","underli","understand","uniqu","unknown","unless","unnecesssari","unprocess","unsur","up","updat","updatedat","upload","url","us","useless","user","username@example.com","usual","utc","uu)id","uuid","vagrant","valid","valu","variou","veri","version","version=3","via","video","virtual","vocabulari","way","web","weight","well","went","we’r","whenev","whitespac","whole","wise","within","without","won’t","word","work","worker","worth","write","wrong","x","yaml","zalando"],"pipeline":["trimmer","stopWordFilter","stemmer"]});
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var lunr = require('lunr')

/**
 *     Search.search('foo')
 *     Search.lunr
 */

window.Search = (function () {
  var Search = {}

  Search.lunr = lunr.Index.load(window.__lunrindex)

  Search.search = function (keywords) {
    var results = Search.lunr.search(keywords)
    return results.map(function (result) {
      // result == { ref: 'index.html#usage', score: 0.99 }
      return window.__searchindex[result.ref]
    })
  }

  return Search
}())

},{"lunr":2}],2:[function(require,module,exports){
/**
 * lunr - http://lunrjs.com - A bit like Solr, but much smaller and not as bright - 0.5.12
 * Copyright (C) 2015 Oliver Nightingale
 * MIT Licensed
 * @license
 */

;(function(){

/**
 * Convenience function for instantiating a new lunr index and configuring it
 * with the default pipeline functions and the passed config function.
 *
 * When using this convenience function a new index will be created with the
 * following functions already in the pipeline:
 *
 * lunr.StopWordFilter - filters out any stop words before they enter the
 * index
 *
 * lunr.stemmer - stems the tokens before entering the index.
 *
 * Example:
 *
 *     var idx = lunr(function () {
 *       this.field('title', 10)
 *       this.field('tags', 100)
 *       this.field('body')
 *       
 *       this.ref('cid')
 *       
 *       this.pipeline.add(function () {
 *         // some custom pipeline function
 *       })
 *       
 *     })
 *
 * @param {Function} config A function that will be called with the new instance
 * of the lunr.Index as both its context and first parameter. It can be used to
 * customize the instance of new lunr.Index.
 * @namespace
 * @module
 * @returns {lunr.Index}
 *
 */
var lunr = function (config) {
  var idx = new lunr.Index

  idx.pipeline.add(
    lunr.trimmer,
    lunr.stopWordFilter,
    lunr.stemmer
  )

  if (config) config.call(idx, idx)

  return idx
}

lunr.version = "0.5.12"
/*!
 * lunr.utils
 * Copyright (C) 2015 Oliver Nightingale
 */

/**
 * A namespace containing utils for the rest of the lunr library
 */
lunr.utils = {}

/**
 * Print a warning message to the console.
 *
 * @param {String} message The message to be printed.
 * @memberOf Utils
 */
lunr.utils.warn = (function (global) {
  return function (message) {
    if (global.console && console.warn) {
      console.warn(message)
    }
  }
})(this)

/*!
 * lunr.EventEmitter
 * Copyright (C) 2015 Oliver Nightingale
 */

/**
 * lunr.EventEmitter is an event emitter for lunr. It manages adding and removing event handlers and triggering events and their handlers.
 *
 * @constructor
 */
lunr.EventEmitter = function () {
  this.events = {}
}

/**
 * Binds a handler function to a specific event(s).
 *
 * Can bind a single function to many different events in one call.
 *
 * @param {String} [eventName] The name(s) of events to bind this function to.
 * @param {Function} fn The function to call when an event is fired.
 * @memberOf EventEmitter
 */
lunr.EventEmitter.prototype.addListener = function () {
  var args = Array.prototype.slice.call(arguments),
      fn = args.pop(),
      names = args

  if (typeof fn !== "function") throw new TypeError ("last argument must be a function")

  names.forEach(function (name) {
    if (!this.hasHandler(name)) this.events[name] = []
    this.events[name].push(fn)
  }, this)
}

/**
 * Removes a handler function from a specific event.
 *
 * @param {String} eventName The name of the event to remove this function from.
 * @param {Function} fn The function to remove from an event.
 * @memberOf EventEmitter
 */
lunr.EventEmitter.prototype.removeListener = function (name, fn) {
  if (!this.hasHandler(name)) return

  var fnIndex = this.events[name].indexOf(fn)
  this.events[name].splice(fnIndex, 1)

  if (!this.events[name].length) delete this.events[name]
}

/**
 * Calls all functions bound to the given event.
 *
 * Additional data can be passed to the event handler as arguments to `emit`
 * after the event name.
 *
 * @param {String} eventName The name of the event to emit.
 * @memberOf EventEmitter
 */
lunr.EventEmitter.prototype.emit = function (name) {
  if (!this.hasHandler(name)) return

  var args = Array.prototype.slice.call(arguments, 1)

  this.events[name].forEach(function (fn) {
    fn.apply(undefined, args)
  })
}

/**
 * Checks whether a handler has ever been stored against an event.
 *
 * @param {String} eventName The name of the event to check.
 * @private
 * @memberOf EventEmitter
 */
lunr.EventEmitter.prototype.hasHandler = function (name) {
  return name in this.events
}

/*!
 * lunr.tokenizer
 * Copyright (C) 2015 Oliver Nightingale
 */

/**
 * A function for splitting a string into tokens ready to be inserted into
 * the search index.
 *
 * @module
 * @param {String} obj The string to convert into tokens
 * @returns {Array}
 */
lunr.tokenizer = function (obj) {
  if (!arguments.length || obj == null || obj == undefined) return []
  if (Array.isArray(obj)) return obj.map(function (t) { return t.toLowerCase() })

  return obj.toString().trim().toLowerCase().split(/[\s\-]+/)
}

/*!
 * lunr.Pipeline
 * Copyright (C) 2015 Oliver Nightingale
 */

/**
 * lunr.Pipelines maintain an ordered list of functions to be applied to all
 * tokens in documents entering the search index and queries being ran against
 * the index.
 *
 * An instance of lunr.Index created with the lunr shortcut will contain a
 * pipeline with a stop word filter and an English language stemmer. Extra
 * functions can be added before or after either of these functions or these
 * default functions can be removed.
 *
 * When run the pipeline will call each function in turn, passing a token, the
 * index of that token in the original list of all tokens and finally a list of
 * all the original tokens.
 *
 * The output of functions in the pipeline will be passed to the next function
 * in the pipeline. To exclude a token from entering the index the function
 * should return undefined, the rest of the pipeline will not be called with
 * this token.
 *
 * For serialisation of pipelines to work, all functions used in an instance of
 * a pipeline should be registered with lunr.Pipeline. Registered functions can
 * then be loaded. If trying to load a serialised pipeline that uses functions
 * that are not registered an error will be thrown.
 *
 * If not planning on serialising the pipeline then registering pipeline functions
 * is not necessary.
 *
 * @constructor
 */
lunr.Pipeline = function () {
  this._stack = []
}

lunr.Pipeline.registeredFunctions = {}

/**
 * Register a function with the pipeline.
 *
 * Functions that are used in the pipeline should be registered if the pipeline
 * needs to be serialised, or a serialised pipeline needs to be loaded.
 *
 * Registering a function does not add it to a pipeline, functions must still be
 * added to instances of the pipeline for them to be used when running a pipeline.
 *
 * @param {Function} fn The function to check for.
 * @param {String} label The label to register this function with
 * @memberOf Pipeline
 */
lunr.Pipeline.registerFunction = function (fn, label) {
  if (label in this.registeredFunctions) {
    lunr.utils.warn('Overwriting existing registered function: ' + label)
  }

  fn.label = label
  lunr.Pipeline.registeredFunctions[fn.label] = fn
}

/**
 * Warns if the function is not registered as a Pipeline function.
 *
 * @param {Function} fn The function to check for.
 * @private
 * @memberOf Pipeline
 */
lunr.Pipeline.warnIfFunctionNotRegistered = function (fn) {
  var isRegistered = fn.label && (fn.label in this.registeredFunctions)

  if (!isRegistered) {
    lunr.utils.warn('Function is not registered with pipeline. This may cause problems when serialising the index.\n', fn)
  }
}

/**
 * Loads a previously serialised pipeline.
 *
 * All functions to be loaded must already be registered with lunr.Pipeline.
 * If any function from the serialised data has not been registered then an
 * error will be thrown.
 *
 * @param {Object} serialised The serialised pipeline to load.
 * @returns {lunr.Pipeline}
 * @memberOf Pipeline
 */
lunr.Pipeline.load = function (serialised) {
  var pipeline = new lunr.Pipeline

  serialised.forEach(function (fnName) {
    var fn = lunr.Pipeline.registeredFunctions[fnName]

    if (fn) {
      pipeline.add(fn)
    } else {
      throw new Error('Cannot load un-registered function: ' + fnName)
    }
  })

  return pipeline
}

/**
 * Adds new functions to the end of the pipeline.
 *
 * Logs a warning if the function has not been registered.
 *
 * @param {Function} functions Any number of functions to add to the pipeline.
 * @memberOf Pipeline
 */
lunr.Pipeline.prototype.add = function () {
  var fns = Array.prototype.slice.call(arguments)

  fns.forEach(function (fn) {
    lunr.Pipeline.warnIfFunctionNotRegistered(fn)
    this._stack.push(fn)
  }, this)
}

/**
 * Adds a single function after a function that already exists in the
 * pipeline.
 *
 * Logs a warning if the function has not been registered.
 *
 * @param {Function} existingFn A function that already exists in the pipeline.
 * @param {Function} newFn The new function to add to the pipeline.
 * @memberOf Pipeline
 */
lunr.Pipeline.prototype.after = function (existingFn, newFn) {
  lunr.Pipeline.warnIfFunctionNotRegistered(newFn)

  var pos = this._stack.indexOf(existingFn)
  if (pos == -1) {
    throw new Error('Cannot find existingFn')
  }

  pos = pos + 1
  this._stack.splice(pos, 0, newFn)
}

/**
 * Adds a single function before a function that already exists in the
 * pipeline.
 *
 * Logs a warning if the function has not been registered.
 *
 * @param {Function} existingFn A function that already exists in the pipeline.
 * @param {Function} newFn The new function to add to the pipeline.
 * @memberOf Pipeline
 */
lunr.Pipeline.prototype.before = function (existingFn, newFn) {
  lunr.Pipeline.warnIfFunctionNotRegistered(newFn)

  var pos = this._stack.indexOf(existingFn)
  if (pos == -1) {
    throw new Error('Cannot find existingFn')
  }

  this._stack.splice(pos, 0, newFn)
}

/**
 * Removes a function from the pipeline.
 *
 * @param {Function} fn The function to remove from the pipeline.
 * @memberOf Pipeline
 */
lunr.Pipeline.prototype.remove = function (fn) {
  var pos = this._stack.indexOf(fn)
  if (pos == -1) {
    return
  }

  this._stack.splice(pos, 1)
}

/**
 * Runs the current list of functions that make up the pipeline against the
 * passed tokens.
 *
 * @param {Array} tokens The tokens to run through the pipeline.
 * @returns {Array}
 * @memberOf Pipeline
 */
lunr.Pipeline.prototype.run = function (tokens) {
  var out = [],
      tokenLength = tokens.length,
      stackLength = this._stack.length

  for (var i = 0; i < tokenLength; i++) {
    var token = tokens[i]

    for (var j = 0; j < stackLength; j++) {
      token = this._stack[j](token, i, tokens)
      if (token === void 0) break
    };

    if (token !== void 0) out.push(token)
  };

  return out
}

/**
 * Resets the pipeline by removing any existing processors.
 *
 * @memberOf Pipeline
 */
lunr.Pipeline.prototype.reset = function () {
  this._stack = []
}

/**
 * Returns a representation of the pipeline ready for serialisation.
 *
 * Logs a warning if the function has not been registered.
 *
 * @returns {Array}
 * @memberOf Pipeline
 */
lunr.Pipeline.prototype.toJSON = function () {
  return this._stack.map(function (fn) {
    lunr.Pipeline.warnIfFunctionNotRegistered(fn)

    return fn.label
  })
}
/*!
 * lunr.Vector
 * Copyright (C) 2015 Oliver Nightingale
 */

/**
 * lunr.Vectors implement vector related operations for
 * a series of elements.
 *
 * @constructor
 */
lunr.Vector = function () {
  this._magnitude = null
  this.list = undefined
  this.length = 0
}

/**
 * lunr.Vector.Node is a simple struct for each node
 * in a lunr.Vector.
 *
 * @private
 * @param {Number} The index of the node in the vector.
 * @param {Object} The data at this node in the vector.
 * @param {lunr.Vector.Node} The node directly after this node in the vector.
 * @constructor
 * @memberOf Vector
 */
lunr.Vector.Node = function (idx, val, next) {
  this.idx = idx
  this.val = val
  this.next = next
}

/**
 * Inserts a new value at a position in a vector.
 *
 * @param {Number} The index at which to insert a value.
 * @param {Object} The object to insert in the vector.
 * @memberOf Vector.
 */
lunr.Vector.prototype.insert = function (idx, val) {
  this._magnitude = undefined;
  var list = this.list

  if (!list) {
    this.list = new lunr.Vector.Node (idx, val, list)
    return this.length++
  }

  if (idx < list.idx) {
    this.list = new lunr.Vector.Node (idx, val, list)
    return this.length++
  }

  var prev = list,
      next = list.next

  while (next != undefined) {
    if (idx < next.idx) {
      prev.next = new lunr.Vector.Node (idx, val, next)
      return this.length++
    }

    prev = next, next = next.next
  }

  prev.next = new lunr.Vector.Node (idx, val, next)
  return this.length++
}

/**
 * Calculates the magnitude of this vector.
 *
 * @returns {Number}
 * @memberOf Vector
 */
lunr.Vector.prototype.magnitude = function () {
  if (this._magnitude) return this._magnitude
  var node = this.list,
      sumOfSquares = 0,
      val

  while (node) {
    val = node.val
    sumOfSquares += val * val
    node = node.next
  }

  return this._magnitude = Math.sqrt(sumOfSquares)
}

/**
 * Calculates the dot product of this vector and another vector.
 *
 * @param {lunr.Vector} otherVector The vector to compute the dot product with.
 * @returns {Number}
 * @memberOf Vector
 */
lunr.Vector.prototype.dot = function (otherVector) {
  var node = this.list,
      otherNode = otherVector.list,
      dotProduct = 0

  while (node && otherNode) {
    if (node.idx < otherNode.idx) {
      node = node.next
    } else if (node.idx > otherNode.idx) {
      otherNode = otherNode.next
    } else {
      dotProduct += node.val * otherNode.val
      node = node.next
      otherNode = otherNode.next
    }
  }

  return dotProduct
}

/**
 * Calculates the cosine similarity between this vector and another
 * vector.
 *
 * @param {lunr.Vector} otherVector The other vector to calculate the
 * similarity with.
 * @returns {Number}
 * @memberOf Vector
 */
lunr.Vector.prototype.similarity = function (otherVector) {
  return this.dot(otherVector) / (this.magnitude() * otherVector.magnitude())
}
/*!
 * lunr.SortedSet
 * Copyright (C) 2015 Oliver Nightingale
 */

/**
 * lunr.SortedSets are used to maintain an array of uniq values in a sorted
 * order.
 *
 * @constructor
 */
lunr.SortedSet = function () {
  this.length = 0
  this.elements = []
}

/**
 * Loads a previously serialised sorted set.
 *
 * @param {Array} serialisedData The serialised set to load.
 * @returns {lunr.SortedSet}
 * @memberOf SortedSet
 */
lunr.SortedSet.load = function (serialisedData) {
  var set = new this

  set.elements = serialisedData
  set.length = serialisedData.length

  return set
}

/**
 * Inserts new items into the set in the correct position to maintain the
 * order.
 *
 * @param {Object} The objects to add to this set.
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.add = function () {
  var i, element

  for (i = 0; i < arguments.length; i++) {
    element = arguments[i]
    if (~this.indexOf(element)) continue
    this.elements.splice(this.locationFor(element), 0, element)
  }

  this.length = this.elements.length
}

/**
 * Converts this sorted set into an array.
 *
 * @returns {Array}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.toArray = function () {
  return this.elements.slice()
}

/**
 * Creates a new array with the results of calling a provided function on every
 * element in this sorted set.
 *
 * Delegates to Array.prototype.map and has the same signature.
 *
 * @param {Function} fn The function that is called on each element of the
 * set.
 * @param {Object} ctx An optional object that can be used as the context
 * for the function fn.
 * @returns {Array}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.map = function (fn, ctx) {
  return this.elements.map(fn, ctx)
}

/**
 * Executes a provided function once per sorted set element.
 *
 * Delegates to Array.prototype.forEach and has the same signature.
 *
 * @param {Function} fn The function that is called on each element of the
 * set.
 * @param {Object} ctx An optional object that can be used as the context
 * @memberOf SortedSet
 * for the function fn.
 */
lunr.SortedSet.prototype.forEach = function (fn, ctx) {
  return this.elements.forEach(fn, ctx)
}

/**
 * Returns the index at which a given element can be found in the
 * sorted set, or -1 if it is not present.
 *
 * @param {Object} elem The object to locate in the sorted set.
 * @returns {Number}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.indexOf = function (elem) {
  var start = 0,
      end = this.elements.length,
      sectionLength = end - start,
      pivot = start + Math.floor(sectionLength / 2),
      pivotElem = this.elements[pivot]

  while (sectionLength > 1) {
    if (pivotElem === elem) return pivot

    if (pivotElem < elem) start = pivot
    if (pivotElem > elem) end = pivot

    sectionLength = end - start
    pivot = start + Math.floor(sectionLength / 2)
    pivotElem = this.elements[pivot]
  }

  if (pivotElem === elem) return pivot

  return -1
}

/**
 * Returns the position within the sorted set that an element should be
 * inserted at to maintain the current order of the set.
 *
 * This function assumes that the element to search for does not already exist
 * in the sorted set.
 *
 * @param {Object} elem The elem to find the position for in the set
 * @returns {Number}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.locationFor = function (elem) {
  var start = 0,
      end = this.elements.length,
      sectionLength = end - start,
      pivot = start + Math.floor(sectionLength / 2),
      pivotElem = this.elements[pivot]

  while (sectionLength > 1) {
    if (pivotElem < elem) start = pivot
    if (pivotElem > elem) end = pivot

    sectionLength = end - start
    pivot = start + Math.floor(sectionLength / 2)
    pivotElem = this.elements[pivot]
  }

  if (pivotElem > elem) return pivot
  if (pivotElem < elem) return pivot + 1
}

/**
 * Creates a new lunr.SortedSet that contains the elements in the intersection
 * of this set and the passed set.
 *
 * @param {lunr.SortedSet} otherSet The set to intersect with this set.
 * @returns {lunr.SortedSet}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.intersect = function (otherSet) {
  var intersectSet = new lunr.SortedSet,
      i = 0, j = 0,
      a_len = this.length, b_len = otherSet.length,
      a = this.elements, b = otherSet.elements

  while (true) {
    if (i > a_len - 1 || j > b_len - 1) break

    if (a[i] === b[j]) {
      intersectSet.add(a[i])
      i++, j++
      continue
    }

    if (a[i] < b[j]) {
      i++
      continue
    }

    if (a[i] > b[j]) {
      j++
      continue
    }
  };

  return intersectSet
}

/**
 * Makes a copy of this set
 *
 * @returns {lunr.SortedSet}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.clone = function () {
  var clone = new lunr.SortedSet

  clone.elements = this.toArray()
  clone.length = clone.elements.length

  return clone
}

/**
 * Creates a new lunr.SortedSet that contains the elements in the union
 * of this set and the passed set.
 *
 * @param {lunr.SortedSet} otherSet The set to union with this set.
 * @returns {lunr.SortedSet}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.union = function (otherSet) {
  var longSet, shortSet, unionSet

  if (this.length >= otherSet.length) {
    longSet = this, shortSet = otherSet
  } else {
    longSet = otherSet, shortSet = this
  }

  unionSet = longSet.clone()

  unionSet.add.apply(unionSet, shortSet.toArray())

  return unionSet
}

/**
 * Returns a representation of the sorted set ready for serialisation.
 *
 * @returns {Array}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.toJSON = function () {
  return this.toArray()
}
/*!
 * lunr.Index
 * Copyright (C) 2015 Oliver Nightingale
 */

/**
 * lunr.Index is object that manages a search index.  It contains the indexes
 * and stores all the tokens and document lookups.  It also provides the main
 * user facing API for the library.
 *
 * @constructor
 */
lunr.Index = function () {
  this._fields = []
  this._ref = 'id'
  this.pipeline = new lunr.Pipeline
  this.documentStore = new lunr.Store
  this.tokenStore = new lunr.TokenStore
  this.corpusTokens = new lunr.SortedSet
  this.eventEmitter =  new lunr.EventEmitter

  this._idfCache = {}

  this.on('add', 'remove', 'update', (function () {
    this._idfCache = {}
  }).bind(this))
}

/**
 * Bind a handler to events being emitted by the index.
 *
 * The handler can be bound to many events at the same time.
 *
 * @param {String} [eventName] The name(s) of events to bind the function to.
 * @param {Function} fn The serialised set to load.
 * @memberOf Index
 */
lunr.Index.prototype.on = function () {
  var args = Array.prototype.slice.call(arguments)
  return this.eventEmitter.addListener.apply(this.eventEmitter, args)
}

/**
 * Removes a handler from an event being emitted by the index.
 *
 * @param {String} eventName The name of events to remove the function from.
 * @param {Function} fn The serialised set to load.
 * @memberOf Index
 */
lunr.Index.prototype.off = function (name, fn) {
  return this.eventEmitter.removeListener(name, fn)
}

/**
 * Loads a previously serialised index.
 *
 * Issues a warning if the index being imported was serialised
 * by a different version of lunr.
 *
 * @param {Object} serialisedData The serialised set to load.
 * @returns {lunr.Index}
 * @memberOf Index
 */
lunr.Index.load = function (serialisedData) {
  if (serialisedData.version !== lunr.version) {
    lunr.utils.warn('version mismatch: current ' + lunr.version + ' importing ' + serialisedData.version)
  }

  var idx = new this

  idx._fields = serialisedData.fields
  idx._ref = serialisedData.ref

  idx.documentStore = lunr.Store.load(serialisedData.documentStore)
  idx.tokenStore = lunr.TokenStore.load(serialisedData.tokenStore)
  idx.corpusTokens = lunr.SortedSet.load(serialisedData.corpusTokens)
  idx.pipeline = lunr.Pipeline.load(serialisedData.pipeline)

  return idx
}

/**
 * Adds a field to the list of fields that will be searchable within documents
 * in the index.
 *
 * An optional boost param can be passed to affect how much tokens in this field
 * rank in search results, by default the boost value is 1.
 *
 * Fields should be added before any documents are added to the index, fields
 * that are added after documents are added to the index will only apply to new
 * documents added to the index.
 *
 * @param {String} fieldName The name of the field within the document that
 * should be indexed
 * @param {Number} boost An optional boost that can be applied to terms in this
 * field.
 * @returns {lunr.Index}
 * @memberOf Index
 */
lunr.Index.prototype.field = function (fieldName, opts) {
  var opts = opts || {},
      field = { name: fieldName, boost: opts.boost || 1 }

  this._fields.push(field)
  return this
}

/**
 * Sets the property used to uniquely identify documents added to the index,
 * by default this property is 'id'.
 *
 * This should only be changed before adding documents to the index, changing
 * the ref property without resetting the index can lead to unexpected results.
 *
 * @param {String} refName The property to use to uniquely identify the
 * documents in the index.
 * @param {Boolean} emitEvent Whether to emit add events, defaults to true
 * @returns {lunr.Index}
 * @memberOf Index
 */
lunr.Index.prototype.ref = function (refName) {
  this._ref = refName
  return this
}

/**
 * Add a document to the index.
 *
 * This is the way new documents enter the index, this function will run the
 * fields from the document through the index's pipeline and then add it to
 * the index, it will then show up in search results.
 *
 * An 'add' event is emitted with the document that has been added and the index
 * the document has been added to. This event can be silenced by passing false
 * as the second argument to add.
 *
 * @param {Object} doc The document to add to the index.
 * @param {Boolean} emitEvent Whether or not to emit events, default true.
 * @memberOf Index
 */
lunr.Index.prototype.add = function (doc, emitEvent) {
  var docTokens = {},
      allDocumentTokens = new lunr.SortedSet,
      docRef = doc[this._ref],
      emitEvent = emitEvent === undefined ? true : emitEvent

  this._fields.forEach(function (field) {
    var fieldTokens = this.pipeline.run(lunr.tokenizer(doc[field.name]))

    docTokens[field.name] = fieldTokens
    lunr.SortedSet.prototype.add.apply(allDocumentTokens, fieldTokens)
  }, this)

  this.documentStore.set(docRef, allDocumentTokens)
  lunr.SortedSet.prototype.add.apply(this.corpusTokens, allDocumentTokens.toArray())

  for (var i = 0; i < allDocumentTokens.length; i++) {
    var token = allDocumentTokens.elements[i]
    var tf = this._fields.reduce(function (memo, field) {
      var fieldLength = docTokens[field.name].length

      if (!fieldLength) return memo

      var tokenCount = docTokens[field.name].filter(function (t) { return t === token }).length

      return memo + (tokenCount / fieldLength * field.boost)
    }, 0)

    this.tokenStore.add(token, { ref: docRef, tf: tf })
  };

  if (emitEvent) this.eventEmitter.emit('add', doc, this)
}

/**
 * Removes a document from the index.
 *
 * To make sure documents no longer show up in search results they can be
 * removed from the index using this method.
 *
 * The document passed only needs to have the same ref property value as the
 * document that was added to the index, they could be completely different
 * objects.
 *
 * A 'remove' event is emitted with the document that has been removed and the index
 * the document has been removed from. This event can be silenced by passing false
 * as the second argument to remove.
 *
 * @param {Object} doc The document to remove from the index.
 * @param {Boolean} emitEvent Whether to emit remove events, defaults to true
 * @memberOf Index
 */
lunr.Index.prototype.remove = function (doc, emitEvent) {
  var docRef = doc[this._ref],
      emitEvent = emitEvent === undefined ? true : emitEvent

  if (!this.documentStore.has(docRef)) return

  var docTokens = this.documentStore.get(docRef)

  this.documentStore.remove(docRef)

  docTokens.forEach(function (token) {
    this.tokenStore.remove(token, docRef)
  }, this)

  if (emitEvent) this.eventEmitter.emit('remove', doc, this)
}

/**
 * Updates a document in the index.
 *
 * When a document contained within the index gets updated, fields changed,
 * added or removed, to make sure it correctly matched against search queries,
 * it should be updated in the index.
 *
 * This method is just a wrapper around `remove` and `add`
 *
 * An 'update' event is emitted with the document that has been updated and the index.
 * This event can be silenced by passing false as the second argument to update. Only
 * an update event will be fired, the 'add' and 'remove' events of the underlying calls
 * are silenced.
 *
 * @param {Object} doc The document to update in the index.
 * @param {Boolean} emitEvent Whether to emit update events, defaults to true
 * @see Index.prototype.remove
 * @see Index.prototype.add
 * @memberOf Index
 */
lunr.Index.prototype.update = function (doc, emitEvent) {
  var emitEvent = emitEvent === undefined ? true : emitEvent

  this.remove(doc, false)
  this.add(doc, false)

  if (emitEvent) this.eventEmitter.emit('update', doc, this)
}

/**
 * Calculates the inverse document frequency for a token within the index.
 *
 * @param {String} token The token to calculate the idf of.
 * @see Index.prototype.idf
 * @private
 * @memberOf Index
 */
lunr.Index.prototype.idf = function (term) {
  var cacheKey = "@" + term
  if (Object.prototype.hasOwnProperty.call(this._idfCache, cacheKey)) return this._idfCache[cacheKey]

  var documentFrequency = this.tokenStore.count(term),
      idf = 1

  if (documentFrequency > 0) {
    idf = 1 + Math.log(this.documentStore.length / documentFrequency)
  }

  return this._idfCache[cacheKey] = idf
}

/**
 * Searches the index using the passed query.
 *
 * Queries should be a string, multiple words are allowed and will lead to an
 * AND based query, e.g. `idx.search('foo bar')` will run a search for
 * documents containing both 'foo' and 'bar'.
 *
 * All query tokens are passed through the same pipeline that document tokens
 * are passed through, so any language processing involved will be run on every
 * query term.
 *
 * Each query term is expanded, so that the term 'he' might be expanded to
 * 'hello' and 'help' if those terms were already included in the index.
 *
 * Matching documents are returned as an array of objects, each object contains
 * the matching document ref, as set for this index, and the similarity score
 * for this document against the query.
 *
 * @param {String} query The query to search the index with.
 * @returns {Object}
 * @see Index.prototype.idf
 * @see Index.prototype.documentVector
 * @memberOf Index
 */
lunr.Index.prototype.search = function (query) {
  var queryTokens = this.pipeline.run(lunr.tokenizer(query)),
      queryVector = new lunr.Vector,
      documentSets = [],
      fieldBoosts = this._fields.reduce(function (memo, f) { return memo + f.boost }, 0)

  var hasSomeToken = queryTokens.some(function (token) {
    return this.tokenStore.has(token)
  }, this)

  if (!hasSomeToken) return []

  queryTokens
    .forEach(function (token, i, tokens) {
      var tf = 1 / tokens.length * this._fields.length * fieldBoosts,
          self = this

      var set = this.tokenStore.expand(token).reduce(function (memo, key) {
        var pos = self.corpusTokens.indexOf(key),
            idf = self.idf(key),
            similarityBoost = 1,
            set = new lunr.SortedSet

        // if the expanded key is not an exact match to the token then
        // penalise the score for this key by how different the key is
        // to the token.
        if (key !== token) {
          var diff = Math.max(3, key.length - token.length)
          similarityBoost = 1 / Math.log(diff)
        }

        // calculate the query tf-idf score for this token
        // applying an similarityBoost to ensure exact matches
        // these rank higher than expanded terms
        if (pos > -1) queryVector.insert(pos, tf * idf * similarityBoost)

        // add all the documents that have this key into a set
        Object.keys(self.tokenStore.get(key)).forEach(function (ref) { set.add(ref) })

        return memo.union(set)
      }, new lunr.SortedSet)

      documentSets.push(set)
    }, this)

  var documentSet = documentSets.reduce(function (memo, set) {
    return memo.intersect(set)
  })

  return documentSet
    .map(function (ref) {
      return { ref: ref, score: queryVector.similarity(this.documentVector(ref)) }
    }, this)
    .sort(function (a, b) {
      return b.score - a.score
    })
}

/**
 * Generates a vector containing all the tokens in the document matching the
 * passed documentRef.
 *
 * The vector contains the tf-idf score for each token contained in the
 * document with the passed documentRef.  The vector will contain an element
 * for every token in the indexes corpus, if the document does not contain that
 * token the element will be 0.
 *
 * @param {Object} documentRef The ref to find the document with.
 * @returns {lunr.Vector}
 * @private
 * @memberOf Index
 */
lunr.Index.prototype.documentVector = function (documentRef) {
  var documentTokens = this.documentStore.get(documentRef),
      documentTokensLength = documentTokens.length,
      documentVector = new lunr.Vector

  for (var i = 0; i < documentTokensLength; i++) {
    var token = documentTokens.elements[i],
        tf = this.tokenStore.get(token)[documentRef].tf,
        idf = this.idf(token)

    documentVector.insert(this.corpusTokens.indexOf(token), tf * idf)
  };

  return documentVector
}

/**
 * Returns a representation of the index ready for serialisation.
 *
 * @returns {Object}
 * @memberOf Index
 */
lunr.Index.prototype.toJSON = function () {
  return {
    version: lunr.version,
    fields: this._fields,
    ref: this._ref,
    documentStore: this.documentStore.toJSON(),
    tokenStore: this.tokenStore.toJSON(),
    corpusTokens: this.corpusTokens.toJSON(),
    pipeline: this.pipeline.toJSON()
  }
}

/**
 * Applies a plugin to the current index.
 *
 * A plugin is a function that is called with the index as its context.
 * Plugins can be used to customise or extend the behaviour the index
 * in some way. A plugin is just a function, that encapsulated the custom
 * behaviour that should be applied to the index.
 *
 * The plugin function will be called with the index as its argument, additional
 * arguments can also be passed when calling use. The function will be called
 * with the index as its context.
 *
 * Example:
 *
 *     var myPlugin = function (idx, arg1, arg2) {
 *       // `this` is the index to be extended
 *       // apply any extensions etc here.
 *     }
 *
 *     var idx = lunr(function () {
 *       this.use(myPlugin, 'arg1', 'arg2')
 *     })
 *
 * @param {Function} plugin The plugin to apply.
 * @memberOf Index
 */
lunr.Index.prototype.use = function (plugin) {
  var args = Array.prototype.slice.call(arguments, 1)
  args.unshift(this)
  plugin.apply(this, args)
}
/*!
 * lunr.Store
 * Copyright (C) 2015 Oliver Nightingale
 */

/**
 * lunr.Store is a simple key-value store used for storing sets of tokens for
 * documents stored in index.
 *
 * @constructor
 * @module
 */
lunr.Store = function () {
  this.store = {}
  this.length = 0
}

/**
 * Loads a previously serialised store
 *
 * @param {Object} serialisedData The serialised store to load.
 * @returns {lunr.Store}
 * @memberOf Store
 */
lunr.Store.load = function (serialisedData) {
  var store = new this

  store.length = serialisedData.length
  store.store = Object.keys(serialisedData.store).reduce(function (memo, key) {
    memo[key] = lunr.SortedSet.load(serialisedData.store[key])
    return memo
  }, {})

  return store
}

/**
 * Stores the given tokens in the store against the given id.
 *
 * @param {Object} id The key used to store the tokens against.
 * @param {Object} tokens The tokens to store against the key.
 * @memberOf Store
 */
lunr.Store.prototype.set = function (id, tokens) {
  if (!this.has(id)) this.length++
  this.store[id] = tokens
}

/**
 * Retrieves the tokens from the store for a given key.
 *
 * @param {Object} id The key to lookup and retrieve from the store.
 * @returns {Object}
 * @memberOf Store
 */
lunr.Store.prototype.get = function (id) {
  return this.store[id]
}

/**
 * Checks whether the store contains a key.
 *
 * @param {Object} id The id to look up in the store.
 * @returns {Boolean}
 * @memberOf Store
 */
lunr.Store.prototype.has = function (id) {
  return id in this.store
}

/**
 * Removes the value for a key in the store.
 *
 * @param {Object} id The id to remove from the store.
 * @memberOf Store
 */
lunr.Store.prototype.remove = function (id) {
  if (!this.has(id)) return

  delete this.store[id]
  this.length--
}

/**
 * Returns a representation of the store ready for serialisation.
 *
 * @returns {Object}
 * @memberOf Store
 */
lunr.Store.prototype.toJSON = function () {
  return {
    store: this.store,
    length: this.length
  }
}

/*!
 * lunr.stemmer
 * Copyright (C) 2015 Oliver Nightingale
 * Includes code from - http://tartarus.org/~martin/PorterStemmer/js.txt
 */

/**
 * lunr.stemmer is an english language stemmer, this is a JavaScript
 * implementation of the PorterStemmer taken from http://tartarus.org/~martin
 *
 * @module
 * @param {String} str The string to stem
 * @returns {String}
 * @see lunr.Pipeline
 */
lunr.stemmer = (function(){
  var step2list = {
      "ational" : "ate",
      "tional" : "tion",
      "enci" : "ence",
      "anci" : "ance",
      "izer" : "ize",
      "bli" : "ble",
      "alli" : "al",
      "entli" : "ent",
      "eli" : "e",
      "ousli" : "ous",
      "ization" : "ize",
      "ation" : "ate",
      "ator" : "ate",
      "alism" : "al",
      "iveness" : "ive",
      "fulness" : "ful",
      "ousness" : "ous",
      "aliti" : "al",
      "iviti" : "ive",
      "biliti" : "ble",
      "logi" : "log"
    },

    step3list = {
      "icate" : "ic",
      "ative" : "",
      "alize" : "al",
      "iciti" : "ic",
      "ical" : "ic",
      "ful" : "",
      "ness" : ""
    },

    c = "[^aeiou]",          // consonant
    v = "[aeiouy]",          // vowel
    C = c + "[^aeiouy]*",    // consonant sequence
    V = v + "[aeiou]*",      // vowel sequence

    mgr0 = "^(" + C + ")?" + V + C,               // [C]VC... is m>0
    meq1 = "^(" + C + ")?" + V + C + "(" + V + ")?$",  // [C]VC[V] is m=1
    mgr1 = "^(" + C + ")?" + V + C + V + C,       // [C]VCVC... is m>1
    s_v = "^(" + C + ")?" + v;                   // vowel in stem

  var re_mgr0 = new RegExp(mgr0);
  var re_mgr1 = new RegExp(mgr1);
  var re_meq1 = new RegExp(meq1);
  var re_s_v = new RegExp(s_v);

  var re_1a = /^(.+?)(ss|i)es$/;
  var re2_1a = /^(.+?)([^s])s$/;
  var re_1b = /^(.+?)eed$/;
  var re2_1b = /^(.+?)(ed|ing)$/;
  var re_1b_2 = /.$/;
  var re2_1b_2 = /(at|bl|iz)$/;
  var re3_1b_2 = new RegExp("([^aeiouylsz])\\1$");
  var re4_1b_2 = new RegExp("^" + C + v + "[^aeiouwxy]$");

  var re_1c = /^(.+?[^aeiou])y$/;
  var re_2 = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;

  var re_3 = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;

  var re_4 = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;
  var re2_4 = /^(.+?)(s|t)(ion)$/;

  var re_5 = /^(.+?)e$/;
  var re_5_1 = /ll$/;
  var re3_5 = new RegExp("^" + C + v + "[^aeiouwxy]$");

  var porterStemmer = function porterStemmer(w) {
    var   stem,
      suffix,
      firstch,
      re,
      re2,
      re3,
      re4;

    if (w.length < 3) { return w; }

    firstch = w.substr(0,1);
    if (firstch == "y") {
      w = firstch.toUpperCase() + w.substr(1);
    }

    // Step 1a
    re = re_1a
    re2 = re2_1a;

    if (re.test(w)) { w = w.replace(re,"$1$2"); }
    else if (re2.test(w)) { w = w.replace(re2,"$1$2"); }

    // Step 1b
    re = re_1b;
    re2 = re2_1b;
    if (re.test(w)) {
      var fp = re.exec(w);
      re = re_mgr0;
      if (re.test(fp[1])) {
        re = re_1b_2;
        w = w.replace(re,"");
      }
    } else if (re2.test(w)) {
      var fp = re2.exec(w);
      stem = fp[1];
      re2 = re_s_v;
      if (re2.test(stem)) {
        w = stem;
        re2 = re2_1b_2;
        re3 = re3_1b_2;
        re4 = re4_1b_2;
        if (re2.test(w)) {  w = w + "e"; }
        else if (re3.test(w)) { re = re_1b_2; w = w.replace(re,""); }
        else if (re4.test(w)) { w = w + "e"; }
      }
    }

    // Step 1c - replace suffix y or Y by i if preceded by a non-vowel which is not the first letter of the word (so cry -> cri, by -> by, say -> say)
    re = re_1c;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      w = stem + "i";
    }

    // Step 2
    re = re_2;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      suffix = fp[2];
      re = re_mgr0;
      if (re.test(stem)) {
        w = stem + step2list[suffix];
      }
    }

    // Step 3
    re = re_3;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      suffix = fp[2];
      re = re_mgr0;
      if (re.test(stem)) {
        w = stem + step3list[suffix];
      }
    }

    // Step 4
    re = re_4;
    re2 = re2_4;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      re = re_mgr1;
      if (re.test(stem)) {
        w = stem;
      }
    } else if (re2.test(w)) {
      var fp = re2.exec(w);
      stem = fp[1] + fp[2];
      re2 = re_mgr1;
      if (re2.test(stem)) {
        w = stem;
      }
    }

    // Step 5
    re = re_5;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      re = re_mgr1;
      re2 = re_meq1;
      re3 = re3_5;
      if (re.test(stem) || (re2.test(stem) && !(re3.test(stem)))) {
        w = stem;
      }
    }

    re = re_5_1;
    re2 = re_mgr1;
    if (re.test(w) && re2.test(w)) {
      re = re_1b_2;
      w = w.replace(re,"");
    }

    // and turn initial Y back to y

    if (firstch == "y") {
      w = firstch.toLowerCase() + w.substr(1);
    }

    return w;
  };

  return porterStemmer;
})();

lunr.Pipeline.registerFunction(lunr.stemmer, 'stemmer')
/*!
 * lunr.stopWordFilter
 * Copyright (C) 2015 Oliver Nightingale
 */

/**
 * lunr.stopWordFilter is an English language stop word list filter, any words
 * contained in the list will not be passed through the filter.
 *
 * This is intended to be used in the Pipeline. If the token does not pass the
 * filter then undefined will be returned.
 *
 * @module
 * @param {String} token The token to pass through the filter
 * @returns {String}
 * @see lunr.Pipeline
 */
lunr.stopWordFilter = function (token) {
  if (token && lunr.stopWordFilter.stopWords[token] !== token) return token;
}

lunr.stopWordFilter.stopWords = {
  'a': 'a',
  'able': 'able',
  'about': 'about',
  'across': 'across',
  'after': 'after',
  'all': 'all',
  'almost': 'almost',
  'also': 'also',
  'am': 'am',
  'among': 'among',
  'an': 'an',
  'and': 'and',
  'any': 'any',
  'are': 'are',
  'as': 'as',
  'at': 'at',
  'be': 'be',
  'because': 'because',
  'been': 'been',
  'but': 'but',
  'by': 'by',
  'can': 'can',
  'cannot': 'cannot',
  'could': 'could',
  'dear': 'dear',
  'did': 'did',
  'do': 'do',
  'does': 'does',
  'either': 'either',
  'else': 'else',
  'ever': 'ever',
  'every': 'every',
  'for': 'for',
  'from': 'from',
  'get': 'get',
  'got': 'got',
  'had': 'had',
  'has': 'has',
  'have': 'have',
  'he': 'he',
  'her': 'her',
  'hers': 'hers',
  'him': 'him',
  'his': 'his',
  'how': 'how',
  'however': 'however',
  'i': 'i',
  'if': 'if',
  'in': 'in',
  'into': 'into',
  'is': 'is',
  'it': 'it',
  'its': 'its',
  'just': 'just',
  'least': 'least',
  'let': 'let',
  'like': 'like',
  'likely': 'likely',
  'may': 'may',
  'me': 'me',
  'might': 'might',
  'most': 'most',
  'must': 'must',
  'my': 'my',
  'neither': 'neither',
  'no': 'no',
  'nor': 'nor',
  'not': 'not',
  'of': 'of',
  'off': 'off',
  'often': 'often',
  'on': 'on',
  'only': 'only',
  'or': 'or',
  'other': 'other',
  'our': 'our',
  'own': 'own',
  'rather': 'rather',
  'said': 'said',
  'say': 'say',
  'says': 'says',
  'she': 'she',
  'should': 'should',
  'since': 'since',
  'so': 'so',
  'some': 'some',
  'than': 'than',
  'that': 'that',
  'the': 'the',
  'their': 'their',
  'them': 'them',
  'then': 'then',
  'there': 'there',
  'these': 'these',
  'they': 'they',
  'this': 'this',
  'tis': 'tis',
  'to': 'to',
  'too': 'too',
  'twas': 'twas',
  'us': 'us',
  'wants': 'wants',
  'was': 'was',
  'we': 'we',
  'were': 'were',
  'what': 'what',
  'when': 'when',
  'where': 'where',
  'which': 'which',
  'while': 'while',
  'who': 'who',
  'whom': 'whom',
  'why': 'why',
  'will': 'will',
  'with': 'with',
  'would': 'would',
  'yet': 'yet',
  'you': 'you',
  'your': 'your'
}

lunr.Pipeline.registerFunction(lunr.stopWordFilter, 'stopWordFilter')
/*!
 * lunr.trimmer
 * Copyright (C) 2015 Oliver Nightingale
 */

/**
 * lunr.trimmer is a pipeline function for trimming non word
 * characters from the begining and end of tokens before they
 * enter the index.
 *
 * This implementation may not work correctly for non latin
 * characters and should either be removed or adapted for use
 * with languages with non-latin characters.
 *
 * @module
 * @param {String} token The token to pass through the filter
 * @returns {String}
 * @see lunr.Pipeline
 */
lunr.trimmer = function (token) {
  var result = token.replace(/^\W+/, '')
                    .replace(/\W+$/, '')
  return result === '' ? undefined : result
}

lunr.Pipeline.registerFunction(lunr.trimmer, 'trimmer')
/*!
 * lunr.stemmer
 * Copyright (C) 2015 Oliver Nightingale
 * Includes code from - http://tartarus.org/~martin/PorterStemmer/js.txt
 */

/**
 * lunr.TokenStore is used for efficient storing and lookup of the reverse
 * index of token to document ref.
 *
 * @constructor
 */
lunr.TokenStore = function () {
  this.root = { docs: {} }
  this.length = 0
}

/**
 * Loads a previously serialised token store
 *
 * @param {Object} serialisedData The serialised token store to load.
 * @returns {lunr.TokenStore}
 * @memberOf TokenStore
 */
lunr.TokenStore.load = function (serialisedData) {
  var store = new this

  store.root = serialisedData.root
  store.length = serialisedData.length

  return store
}

/**
 * Adds a new token doc pair to the store.
 *
 * By default this function starts at the root of the current store, however
 * it can start at any node of any token store if required.
 *
 * @param {String} token The token to store the doc under
 * @param {Object} doc The doc to store against the token
 * @param {Object} root An optional node at which to start looking for the
 * correct place to enter the doc, by default the root of this lunr.TokenStore
 * is used.
 * @memberOf TokenStore
 */
lunr.TokenStore.prototype.add = function (token, doc, root) {
  var root = root || this.root,
      key = token[0],
      rest = token.slice(1)

  if (!(key in root)) root[key] = {docs: {}}

  if (rest.length === 0) {
    root[key].docs[doc.ref] = doc
    this.length += 1
    return
  } else {
    return this.add(rest, doc, root[key])
  }
}

/**
 * Checks whether this key is contained within this lunr.TokenStore.
 *
 * By default this function starts at the root of the current store, however
 * it can start at any node of any token store if required.
 *
 * @param {String} token The token to check for
 * @param {Object} root An optional node at which to start
 * @memberOf TokenStore
 */
lunr.TokenStore.prototype.has = function (token) {
  if (!token) return false

  var node = this.root

  for (var i = 0; i < token.length; i++) {
    if (!node[token[i]]) return false

    node = node[token[i]]
  }

  return true
}

/**
 * Retrieve a node from the token store for a given token.
 *
 * By default this function starts at the root of the current store, however
 * it can start at any node of any token store if required.
 *
 * @param {String} token The token to get the node for.
 * @param {Object} root An optional node at which to start.
 * @returns {Object}
 * @see TokenStore.prototype.get
 * @memberOf TokenStore
 */
lunr.TokenStore.prototype.getNode = function (token) {
  if (!token) return {}

  var node = this.root

  for (var i = 0; i < token.length; i++) {
    if (!node[token[i]]) return {}

    node = node[token[i]]
  }

  return node
}

/**
 * Retrieve the documents for a node for the given token.
 *
 * By default this function starts at the root of the current store, however
 * it can start at any node of any token store if required.
 *
 * @param {String} token The token to get the documents for.
 * @param {Object} root An optional node at which to start.
 * @returns {Object}
 * @memberOf TokenStore
 */
lunr.TokenStore.prototype.get = function (token, root) {
  return this.getNode(token, root).docs || {}
}

lunr.TokenStore.prototype.count = function (token, root) {
  return Object.keys(this.get(token, root)).length
}

/**
 * Remove the document identified by ref from the token in the store.
 *
 * By default this function starts at the root of the current store, however
 * it can start at any node of any token store if required.
 *
 * @param {String} token The token to get the documents for.
 * @param {String} ref The ref of the document to remove from this token.
 * @param {Object} root An optional node at which to start.
 * @returns {Object}
 * @memberOf TokenStore
 */
lunr.TokenStore.prototype.remove = function (token, ref) {
  if (!token) return
  var node = this.root

  for (var i = 0; i < token.length; i++) {
    if (!(token[i] in node)) return
    node = node[token[i]]
  }

  delete node.docs[ref]
}

/**
 * Find all the possible suffixes of the passed token using tokens
 * currently in the store.
 *
 * @param {String} token The token to expand.
 * @returns {Array}
 * @memberOf TokenStore
 */
lunr.TokenStore.prototype.expand = function (token, memo) {
  var root = this.getNode(token),
      docs = root.docs || {},
      memo = memo || []

  if (Object.keys(docs).length) memo.push(token)

  Object.keys(root)
    .forEach(function (key) {
      if (key === 'docs') return

      memo.concat(this.expand(token + key, memo))
    }, this)

  return memo
}

/**
 * Returns a representation of the token store ready for serialisation.
 *
 * @returns {Object}
 * @memberOf TokenStore
 */
lunr.TokenStore.prototype.toJSON = function () {
  return {
    root: this.root,
    length: this.length
  }
}


  /**
   * export the module via AMD, CommonJS or as a browser global
   * Export code from https://github.com/umdjs/umd/blob/master/returnExports.js
   */
  ;(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
      // AMD. Register as an anonymous module.
      define(factory)
    } else if (typeof exports === 'object') {
      /**
       * Node. Does not work with strict CommonJS, but
       * only CommonJS-like enviroments that support module.exports,
       * like Node.
       */
      module.exports = factory()
    } else {
      // Browser globals (root is window)
      root.lunr = factory()
    }
  }(this, function () {
    /**
     * Just return a value to define the module export.
     * This example returns an object, but the module
     * can return a function as the exported value.
     */
    return lunr
  }))
})();

},{}]},{},[1]);
