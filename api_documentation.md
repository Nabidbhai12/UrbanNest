#Search module:
API Endpoint:api/search/property
Description: There is a function in backend which builds query on the search parameters recevied and returns the results.

Method:GET

Request body:
{
  "minPrice": 1,
  "maxPrice": 50000000,
  "type": "buy"
}


Response header:
[
	{
		"location": {
			"coordinates": {
				"type": "Point",
				"coordinates": [
					-73.935242,
					40.73061
				]
			},
			"address": "123 Main St",
			"city": "Metropolis",
			"state": "NY",
			"country": "USA",
			"zip": "12345"
		},
		"price": {
			"amount": 250000,
			"currency": "USD"
		},
		"rooms": {
			"bedrooms": 2,
			"bathrooms": 2,
			"kitchens": 1,
			"livingRooms": 1
		},
		"_id": "6598bbc3d81ce98a2214c709",
		"title": "Modern Apartment in City Center",
		"description": "A spacious and modern apartment located in the heart of the city. Close to public transport and amenities.",
		"images": [
			{
				"url": "http://example.com/image1.jpg",
				"caption": "Living Room",
				"_id": "6598bbc3d81ce98a2214c70a"
			},
			{
				"url": "http://example.com/image2.jpg",
				"caption": "Kitchen",
				"_id": "6598bbc3d81ce98a2214c70b"
			}
		],
		"propertyType": "apartment",
		"status": "available",
		"features": [
			"balcony",
			"pool",
			"gym"
		],
		"amenities": [
			"nearby shopping",
			"public transport"
		],
		"area": {
			"value": 1200,
			"unit": "sqft"
		},
		"contact": {
			"name": "John Doe",
			"phone": "123-456-7890",
			"email": "john.doe@example.com"
		},
		"listType": "wishlist",
		"propertyStaus": "buy",
		"postedAt": "2024-01-06T02:32:35.713Z",
		"updatedAt": "2024-01-06T02:32:35.713Z",
		"__v": 0,
		"createdAt": "2024-01-09T14:14:41.294Z"
	},
	{
		"location": {
			"coordinates": {
				"type": "Point",
				"coordinates": [
					-73.935242,
					40.73061
				]
			},
			"address": "123 Main St",
			"city": "Metropolis",
			"state": "NY",
			"zipCode": "12345"
		},
		"price": {
			"amount": 500000,
			"currency": "Taka"
		},
		"rooms": {
			"total": 5,
			"bedrooms": 2,
			"bathrooms": 2,
			"kitchens": 1,
			"livingRooms": 1
		},
		"_id": "659bd4bdc6b7dc8407db3bfd",
		"title": "Stunning Urban Apartment",
		"description": "A beautiful, modern apartment located in the heart of the city. Features two bedrooms, a spacious living room, and a state-of-the-art kitchen.",
		"images": [
			{
				"url": "https://example.com/images/apartment1.jpg",
				"caption": "Front View",
				"_id": "659bd4bdc6b7dc8407db3bfe"
			},
			{
				"url": "https://example.com/images/apartment2.jpg",
				"caption": "Living Room",
				"_id": "659bd4bdc6b7dc8407db3bff"
			}
		],
		"size": 1200,
		"owner": "659bc7672a7773f627849404",
		"propertyStatus": "For Sale",
		"createdAt": "2024-01-08T10:55:57.086Z",
		"updatedAt": "2024-01-08T10:55:57.087Z",
		"__v": 0
	},
	{
		"location": {
			"coordinates": {
				"type": "Point",
				"coordinates": [
					-122.345678,
					37.987456
				]
			},
			"address": "456 Ocean Blvd",
			"city": "Sunshine Bay",
			"state": "CA",
			"zipCode": "98765"
		},
		"price": {
			"amount": 750000,
			"currency": "USD"
		},
		"rooms": {
			"total": 4,
			"bedrooms": 2,
			"bathrooms": 1,
			"kitchens": 1,
			"livingRooms": 1
		},
		"_id": "659bde75ebb8445f84429aad",
		"title": "Cozy Beachfront Bungalow",
		"description": "Charming, sun-drenched getaway steps from the sandy shores. Boasts two bedrooms, a bright open living area, and a deck overlooking the ocean.",
		"images": [
			{
				"url": "https://example.com/images/bungalow1.jpg",
				"caption": "Ocean View",
				"_id": "659bde75ebb8445f84429aae"
			},
			{
				"url": "https://example.com/images/bungalow2.jpg",
				"caption": "Living Area with Deck",
				"_id": "659bde75ebb8445f84429aaf"
			}
		],
		"size": 1500,
		"owner": "659bc7672a7773f627849404",
		"propertyStatus": "For Sale",
		"createdAt": "2024-01-08T11:37:25.136Z",
		"updatedAt": "2024-01-08T11:37:25.136Z",
		"__v": 0
	}
]
Authorization:No
Successful Response

Status Code: 200 OK

Error Handling

    400 Bad Request:
        Returned if the query parameter is missing or invalid.
        Response Body: {"message": "Invalid query parameter."}

    404 Not Found:
        Returned if no suggestions are found for the given query.
        Response Body: {"message": "No suggestions found."}

    500 Internal Server Error:
        A generic error message for unforeseen server issues.
        Response Body: {"message": "Internal server error. Please try again later."}
        

API Endpoint: GET /api/search/suggestions
Description

This endpoint provides autocomplete suggestions or search recommendations based on the user's input in the search bar. It enhances the user experience by offering quick and relevant suggestions as the user types, helping them formulate their search queries more effectively.
Authorization

yes


Request Body

None.
Successful Response

Status Code: 200 OK

Response Body:



{
    "suggestions": [
        "Beachfront Villa",
        "Beachfront Apartment",
        "Beachfront Property in Miami",
        // More suggestions based on the query
    ]
}

Error Handling

    400 Bad Request:
        Returned if the query parameter is missing or invalid.
        Response Body: {"message": "Invalid query parameter."}

    404 Not Found:
        Returned if no suggestions are found for the given query.
        Response Body: {"message": "No suggestions found."}

    500 Internal Server Error:
        A generic error message for unforeseen server issues.
        Response Body: {"message": "Internal server error. Please try again later."}







#The conversation module:

API Endpoint:api/conversation/create
Description:while seeing an property when an user wants to text the owner,a new conversation will be created,for the same two person,for different property there will be different conversation
METHOD:POST

Request body:
{
  "propertyId": "659bd4bdc6b7dc8407db3bfd"
}


Response body:
{
	"_id": "659ea31c45cc970629652462",
	"participants": [
		"659ea1895c59f6208a7d2d0c",
		"659bc7672a7773f627849404"
	],
	"property": "659bd4bdc6b7dc8407db3bfd",
	"createdAt": "2024-01-10T14:01:00.816Z",
	"__v": 0
}
Authorization:Needed

Successful response:200 Ok

Error handling:
400 Bad Request:

    Missing or invalid propertyId in the request body.

401 Unauthorized:

    User is not authenticated or authorized to create conversations.

403 Forbidden:

    User is not allowed to contact the owner of the specified property (e.g., due to privacy settings).

404 Not Found:

    The property with the specified ID does not exist.



API Endpoint:api/conversation/sendMessage

Description:this will send the owner a message

Method:POST

Request body:
{
  "conversationId": "659ea31c45cc970629652462",
  "text": "Hello, I'm interested in your property listing. Could you provide more details?"
}

Response body:
{
	"conversationId": "659ea31c45cc970629652462",
	"sender": "659ea1895c59f6208a7d2d0c",
	"text": "Hello, I'm interested in your property listing. Could you provide more details?",
	"_id": "659ea3ccc0b7d4b9b063ff56",
	"createdAt": "2024-01-10T14:03:56.736Z",
	"__v": 0
}
Authorization: Needed

Successful Response: 200 OK

Error Handling:

    401 Unauthorized:
        User is not authenticated or authorized to access conversations.

    404 Not Found:
        No conversations found for the user.

    500 Internal Server Error:
        Generic server error for unforeseen issues.




API Endpoint: api/conversation/read
Description:

This API allows a user to fetch all their conversations, including the messages in each conversation. It is useful for displaying the user's message inbox with all ongoing conversations.

Method: GET

Authorization: Needed

Successful Response: 200 OK

Request body:None
Response Body:


[
    {
        "_id": "659ea31c45cc970629652462",
        "participants": [
            "659ea1895c59f6208a7d2d0c",
            "659bc7672a7773f627849404"
        ],
        "property": "659bd4bdc6b7dc8407db3bfd",
        "messages": [
            {
                "_id": "659ea3ccc0b7d4b9b063ff56",
                "sender": "659ea1895c59f6208a7d2d0c",
                "text": "Hello, I'm interested in your property listing. Could you provide more details?",
                "createdAt": "2024-01-10T14:03:56.736Z"
            }
            // ... more messages
        ],
        "createdAt": "2024-01-10T14:01:00.816Z"
    }
    // ... more conversations
]

Error Handling:

    401 Unauthorized:
        User is not authenticated or authorized to access conversations.

    404 Not Found:
        No conversations found for the user.

    500 Internal Server Error:
        Generic server error for unforeseen issues.


API Endpoint: GET /api/conversation/:conversationId

Description

Fetches the details of a specific conversation identified by its conversationId. This endpoint returns all messages within the conversation, useful for displaying the entire chat history between participants.

Authorization

Required. Users must be authenticated to access their conversations.

Request Body

None. This is a GET request, so it does not require a request body.
Successful Response

Status Code: 200 OK

Response Body:

json

{
  "_id": "659ea31c45cc970629652462",
  "participants": [
    {
      "_id": "UserId1",
      "username": "User1"
    },
    {
      "_id": "UserId2",
      "username": "User2"
    }
  ],
  "messages": [
    {
      "_id": "MessageId1",
      "sender": "UserId1",
      "text": "Hi, I'm interested in your listing.",
      "createdAt": "2024-01-10T10:00:00.000Z",
      "read": false
    },
    {
      "_id": "MessageId2",
      "sender": "UserId2",
      "text": "Hello, thanks for your interest!",
      "createdAt": "2024-01-10T10:05:00.000Z",
      "read": true
    }
  ],
  "property": "PropertyId",
  "createdAt": "2024-01-10T09:58:00.000Z"
}

Error Handling

    404 Not Found:
        Returned if the conversation with the specified conversationId does not exist or if the user is not a participant in the conversation.
        Response Body: {"message": "Conversation not found or access denied."}

    401 Unauthorized:
        Returned if the user is not authenticated or does not have permission to view the conversation.
        Response Body: {"message": "Unauthorized access."}

    500 Internal Server Error:
        A generic error message for any unforeseen server issues.


API Endpoint: GET /api/conversation/notifications
Description

This endpoint retrieves notifications for new, unread messages across all of a user's conversations. It's designed to inform users about any new messages they haven't read yet, enhancing user engagement and interaction.
Authorization

Required.
Request Body

None
Successful Response

Status Code: 200 OK

Response Body:


[
    {
        "conversationId": "659ea31c45cc970629652462",
        "latestMessage": {
            "text": "Could you tell me more about the property?",
            "createdAt": "2024-01-10T12:30:00.000Z"
        },
        "unreadCount": 2
    },
    // Additional conversations with unread messages
]



Error Handling

    401 Unauthorized:
        Returned if the user is not authenticated.
        Response Body: {"message": "Unauthorized access. Please log in."}

    404 Not Found:
        Returned if there are no conversations or messages for the user.
        Response Body: {"message": "No new messages found."}

    500 Internal Server Error:
        A generic error message for unforeseen server issues.
        Response Body: {"message": "Internal server error. Please try again later."}

Module name:sell

API Endpoint:api/users/addPropertyForSale

Description: Throguh this api,an user can create a sell post to sell his/her real estate.

Method:POST
Request Body:
{
  "title": "Cozy Beachfront Bungalow",
  "description": "Charming, sun-drenched getaway steps from the sandy shores. Boasts two bedrooms, a bright open living area, and a deck overlooking the ocean.",
  "images": [
    {
      "url": "https://example.com/images/bungalow1.jpg",
      "caption": "Ocean View"
    },
    {
      "url": "https://example.com/images/bungalow2.jpg",
      "caption": "Living Area with Deck"
    }
  ],
  "location": {
    "address": "456 Ocean Blvd",
    "city": "Sunshine Bay",
    "state": "CA",
    "country": "USA",
    "zipCode": "98765",
    "coordinates": {
      "type": "Point",
      "coordinates": [-122.345678, 37.987456]
    }
  },
  "price": {
    "amount": 750000,
    "currency": "USD"
  },
  "size": 1500,
  "rooms": {
    "total": 4,
    "bedrooms": 2,
    "bathrooms": 1,
    "kitchens": 1,
    "livingRooms": 1
  },
  "propertyStatus": "For Sale"
}

Response body:
{
	"message": "Property added for sale successfully",
	"property": {
		"title": "Cozy Beachfront Bungalow",
		"description": "Charming, sun-drenched getaway steps from the sandy shores. Boasts two bedrooms, a bright open living area, and a deck overlooking the ocean.",
		"images": [
			{
				"url": "https://example.com/images/bungalow1.jpg",
				"caption": "Ocean View",
				"_id": "659bde75ebb8445f84429aae"
			},
			{
				"url": "https://example.com/images/bungalow2.jpg",
				"caption": "Living Area with Deck",
				"_id": "659bde75ebb8445f84429aaf"
			}
		],
		"location": {
			"address": "456 Ocean Blvd",
			"city": "Sunshine Bay",
			"state": "CA",
			"zipCode": "98765",
			"coordinates": {
				"type": "Point",
				"coordinates": [
					-122.345678,
					37.987456
				]
			}
		},
		"price": {
			"amount": 750000,
			"currency": "USD"
		},
		"size": 1500,
		"rooms": {
			"total": 4,
			"bedrooms": 2,
			"bathrooms": 1,
			"kitchens": 1,
			"livingRooms": 1
		},
		"owner": "659bc7672a7773f627849404",
		"propertyStatus": "For Sale",
		"_id": "659bde75ebb8445f84429aad",
		"createdAt": "2024-01-08T11:37:25.136Z",
		"updatedAt": "2024-01-08T11:37:25.136Z",
		"__v": 0
	}
}

Successful response:201 created

Authorization header:Needed

Error handling:
400 Bad Request:
Missing or invalid required fields in the request body (e.g., title, description, price, location).
Invalid data types for fields (e.g., non-numeric price).
 Incorrect image URL format.

401 Unauthorized:
User is not authenticated or authorized to create listings.

Update a Listing:

API ENDPOINT:  /api/listings/update/:listingId

Description: Allows a user to update the details of an existing listing. Useful for making changes to price, property details, or adding new images.

Method:PUT

Request body:
{
  "title": "Updated Title (optional)",  // Only include if updating the title
  "description": "Updated description (optional)",  // Only include if updating the description
  "price": {
    "amount": 800000,  // Updated price
    "currency": "USD"
  },
  "images": [
    {
      "url": "https://example.com/images/updated-image1.jpg",  // New or updated image
      "caption": "New Image Caption"
    }
  ],
  // Additional fields to update (optional):
  "location": {
    // ...
  },
  "size": 1600,
  "rooms": {
    // ...
  }
}
Response body:
{
  "message": "Listing updated successfully",
  "property": {
    "title": "Updated Title",
    "description": "Updated description",
    "images": [
      // ...
    ],
    "location": {
      // ...
    },
    "price": {
      "amount": 800000,
      "currency": "USD"
    },
    "size": 1600,
    "rooms": {
      // ...
    },
    "owner": "659bc7672a7773f627849404",
    "propertyStatus": "For Sale",
    "_id": "659bde75ebb8445f84429aad",
    "createdAt": "2024-01-08T11:37:25.136Z",
    "updatedAt": "2024-01-11T10:58:00.000Z",  // Updated timestamp
    "__v": 0
  }
}

Successful response:200 OK

Authorization:Needed

Error handling:
400 Bad Request:

Missing or invalid required fields in the request body (e.g., title, description, price, location).
Invalid data types for fields (e.g., non-numeric price).
Incorrect image URL format.
Invalid property status.

401 Unauthorized:

User is not authenticated or authorized to create listings.



API Endpoint:api/listings/deletealisting/:listingId

Description:an user can remove one of his listings.

Method:POST

Request body:None

Response body:
{
  "message": "Listing deleted successfully"
}

Successful response: 204 No content

Authorization:Needed

Error handling:

401 Unauthorized: The user is not authenticated or does not have permission to delete the listing.
404 Not Found: The listing with the specified ID does not exist

API Endpoint:api/listings/getSellingList

Description:can see all the properties that he/she putted on for sellings

Method:GET

Request body:None

Response body:[
	{
		"location": {
			"coordinates": {
				"type": "Point",
				"coordinates": [
					-73.935242,
					40.73061
				]
			},
			"address": "123 Main St",
			"city": "Metropolis",
			"state": "NY",
			"zipCode": "12345"
		},
		"price": {
			"amount": 500000,
			"currency": "Taka"
		},
		"rooms": {
			"total": 5,
			"bedrooms": 2,
			"bathrooms": 2,
			"kitchens": 1,
			"livingRooms": 1
		},
		"_id": "659bd4bdc6b7dc8407db3bfd",
		"title": "Stunning Urban Apartment",
		"description": "A beautiful, modern apartment located in the heart of the city. Features two bedrooms, a spacious living room, and a state-of-the-art kitchen.",
		"images": [
			{
				"url": "https://example.com/images/apartment1.jpg",
				"caption": "Front View",
				"_id": "659bd4bdc6b7dc8407db3bfe"
			},
			{
				"url": "https://example.com/images/apartment2.jpg",
				"caption": "Living Room",
				"_id": "659bd4bdc6b7dc8407db3bff"
			}
		],
		"size": 1200,
		"owner": "659bc7672a7773f627849404",
		"propertyStatus": "For Sale",
		"createdAt": "2024-01-08T10:55:57.086Z",
		"updatedAt": "2024-01-08T10:55:57.087Z",
		"__v": 0
	},
	{
		"location": {
			"coordinates": {
				"type": "Point",
				"coordinates": [
					-122.345678,
					37.987456
				]
			},
			"address": "456 Ocean Blvd",
			"city": "Sunshine Bay",
			"state": "CA",
			"zipCode": "98765"
		},
		"price": {
			"amount": 750000,
			"currency": "USD"
		},
		"rooms": {
			"total": 4,
			"bedrooms": 2,
			"bathrooms": 1,
			"kitchens": 1,
			"livingRooms": 1
		},
		"_id": "659bde75ebb8445f84429aad",
		"title": "Cozy Beachfront Bungalow",
		"description": "Charming, sun-drenched getaway steps from the sandy shores. Boasts two bedrooms, a bright open living area, and a deck overlooking the ocean.",
		"images": [
			{
				"url": "https://example.com/images/bungalow1.jpg",
				"caption": "Ocean View",
				"_id": "659bde75ebb8445f84429aae"
			},
			{
				"url": "https://example.com/images/bungalow2.jpg",
				"caption": "Living Area with Deck",
				"_id": "659bde75ebb8445f84429aaf"
			}
		],
		"size": 1500,
		"owner": "659bc7672a7773f627849404",
		"propertyStatus": "For Sale",
		"createdAt": "2024-01-08T11:37:25.136Z",
		"updatedAt": "2024-01-08T11:37:25.136Z",
		"__v": 0
	}
]

Authorization header:Needed

Successful response:200 OK

Error handling:
401 Unauthorized:
User is not authenticated or authorized to view listings.
404 Not Found:
The user has no listings for sale.


api:api/listings/getWishList
Description:can see all the properties that he/she putted on wishlist for later to see

Method:GET

Request body:None

Response body:[
	{
		"location": {
			"coordinates": {
				"type": "Point",
				"coordinates": [
					-73.935242,
					40.73061
				]
			},
			"address": "123 Main St",
			"city": "Metropolis",
			"state": "NY",
			"zipCode": "12345"
		},
		"price": {
			"amount": 500000,
			"currency": "Taka"
		},
		"rooms": {
			"total": 5,
			"bedrooms": 2,
			"bathrooms": 2,
			"kitchens": 1,
			"livingRooms": 1
		},
		"_id": "659bd4bdc6b7dc8407db3bfd",
		"title": "Stunning Urban Apartment",
		"description": "A beautiful, modern apartment located in the heart of the city. Features two bedrooms, a spacious living room, and a state-of-the-art kitchen.",
		"images": [
			{
				"url": "https://example.com/images/apartment1.jpg",
				"caption": "Front View",
				"_id": "659bd4bdc6b7dc8407db3bfe"
			},
			{
				"url": "https://example.com/images/apartment2.jpg",
				"caption": "Living Room",
				"_id": "659bd4bdc6b7dc8407db3bff"
			}
		],
		"size": 1200,
		"owner": "659bc7672a7773f627849404",
		"propertyStatus": "For Sale",
		"createdAt": "2024-01-08T10:55:57.086Z",
		"updatedAt": "2024-01-08T10:55:57.087Z",
		"__v": 0
	},
	{
		"location": {
			"coordinates": {
				"type": "Point",
				"coordinates": [
					-122.345678,
					37.987456
				]
			},
			"address": "456 Ocean Blvd",
			"city": "Sunshine Bay",
			"state": "CA",
			"zipCode": "98765"
		},
		"price": {
			"amount": 750000,
			"currency": "USD"
		},
		"rooms": {
			"total": 4,
			"bedrooms": 2,
			"bathrooms": 1,
			"kitchens": 1,
			"livingRooms": 1
		},
		"_id": "659bde75ebb8445f84429aad",
		"title": "Cozy Beachfront Bungalow",
		"description": "Charming, sun-drenched getaway steps from the sandy shores. Boasts two bedrooms, a bright open living area, and a deck overlooking the ocean.",
		"images": [
			{
				"url": "https://example.com/images/bungalow1.jpg",
				"caption": "Ocean View",
				"_id": "659bde75ebb8445f84429aae"
			},
			{
				"url": "https://example.com/images/bungalow2.jpg",
				"caption": "Living Area with Deck",
				"_id": "659bde75ebb8445f84429aaf"
			}
		],
		"size": 1500,
		"owner": "659bc7672a7773f627849404",
		"propertyStatus": "For Sale",
		"createdAt": "2024-01-08T11:37:25.136Z",
		"updatedAt": "2024-01-08T11:37:25.136Z",
		"__v": 0
	}
]

Authorization header:Needed

Successful response:200 OK

Error handling:
401 Unauthorized:
User is not authenticated or authorized to view listings.
404 Not Found:
The user has no listings.




api:api/listings/getSoldList
can see all the properties that he/she had sold.

Method:GET

Request body:None

Response body:[
	{
		"location": {
			"coordinates": {
				"type": "Point",
				"coordinates": [
					-73.935242,
					40.73061
				]
			},
			"address": "123 Main St",
			"city": "Metropolis",
			"state": "NY",
			"zipCode": "12345"
		},
		"price": {
			"amount": 500000,
			"currency": "Taka"
		},
		"rooms": {
			"total": 5,
			"bedrooms": 2,
			"bathrooms": 2,
			"kitchens": 1,
			"livingRooms": 1
		},
		"_id": "659bd4bdc6b7dc8407db3bfd",
		"title": "Stunning Urban Apartment",
		"description": "A beautiful, modern apartment located in the heart of the city. Features two bedrooms, a spacious living room, and a state-of-the-art kitchen.",
		"images": [
			{
				"url": "https://example.com/images/apartment1.jpg",
				"caption": "Front View",
				"_id": "659bd4bdc6b7dc8407db3bfe"
			},
			{
				"url": "https://example.com/images/apartment2.jpg",
				"caption": "Living Room",
				"_id": "659bd4bdc6b7dc8407db3bff"
			}
		],
		"size": 1200,
		"owner": "659bc7672a7773f627849404",
		"propertyStatus": "For Sale",
		"createdAt": "2024-01-08T10:55:57.086Z",
		"updatedAt": "2024-01-08T10:55:57.087Z",
		"__v": 0
	},
	{
		"location": {
			"coordinates": {
				"type": "Point",
				"coordinates": [
					-122.345678,
					37.987456
				]
			},
			"address": "456 Ocean Blvd",
			"city": "Sunshine Bay",
			"state": "CA",
			"zipCode": "98765"
		},
		"price": {
			"amount": 750000,
			"currency": "USD"
		},
		"rooms": {
			"total": 4,
			"bedrooms": 2,
			"bathrooms": 1,
			"kitchens": 1,
			"livingRooms": 1
		},
		"_id": "659bde75ebb8445f84429aad",
		"title": "Cozy Beachfront Bungalow",
		"description": "Charming, sun-drenched getaway steps from the sandy shores. Boasts two bedrooms, a bright open living area, and a deck overlooking the ocean.",
		"images": [
			{
				"url": "https://example.com/images/bungalow1.jpg",
				"caption": "Ocean View",
				"_id": "659bde75ebb8445f84429aae"
			},
			{
				"url": "https://example.com/images/bungalow2.jpg",
				"caption": "Living Area with Deck",
				"_id": "659bde75ebb8445f84429aaf"
			}
		],
		"size": 1500,
		"owner": "659bc7672a7773f627849404",
		"propertyStatus": "For Sale",
		"createdAt": "2024-01-08T11:37:25.136Z",
		"updatedAt": "2024-01-08T11:37:25.136Z",
		"__v": 0
	}
]

Authorization header:Needed

Successful response:200 OK

Error handling:
401 Unauthorized:
User is not authenticated or authorized to view listings.
404 Not Found:
The user has no listings.


api:api/listings/getBoughtList
can see all the properties that he/she putted on for sellings

Method:GET

Request body:None

Response body:[
	{
		"location": {
			"coordinates": {
				"type": "Point",
				"coordinates": [
					-73.935242,
					40.73061
				]
			},
			"address": "123 Main St",
			"city": "Metropolis",
			"state": "NY",
			"zipCode": "12345"
		},
		"price": {
			"amount": 500000,
			"currency": "Taka"
		},
		"rooms": {
			"total": 5,
			"bedrooms": 2,
			"bathrooms": 2,
			"kitchens": 1,
			"livingRooms": 1
		},
		"_id": "659bd4bdc6b7dc8407db3bfd",
		"title": "Stunning Urban Apartment",
		"description": "A beautiful, modern apartment located in the heart of the city. Features two bedrooms, a spacious living room, and a state-of-the-art kitchen.",
		"images": [
			{
				"url": "https://example.com/images/apartment1.jpg",
				"caption": "Front View",
				"_id": "659bd4bdc6b7dc8407db3bfe"
			},
			{
				"url": "https://example.com/images/apartment2.jpg",
				"caption": "Living Room",
				"_id": "659bd4bdc6b7dc8407db3bff"
			}
		],
		"size": 1200,
		"owner": "659bc7672a7773f627849404",
		"propertyStatus": "For Sale",
		"createdAt": "2024-01-08T10:55:57.086Z",
		"updatedAt": "2024-01-08T10:55:57.087Z",
		"__v": 0
	},
	{
		"location": {
			"coordinates": {
				"type": "Point",
				"coordinates": [
					-122.345678,
					37.987456
				]
			},
			"address": "456 Ocean Blvd",
			"city": "Sunshine Bay",
			"state": "CA",
			"zipCode": "98765"
		},
		"price": {
			"amount": 750000,
			"currency": "USD"
		},
		"rooms": {
			"total": 4,
			"bedrooms": 2,
			"bathrooms": 1,
			"kitchens": 1,
			"livingRooms": 1
		},
		"_id": "659bde75ebb8445f84429aad",
		"title": "Cozy Beachfront Bungalow",
		"description": "Charming, sun-drenched getaway steps from the sandy shores. Boasts two bedrooms, a bright open living area, and a deck overlooking the ocean.",
		"images": [
			{
				"url": "https://example.com/images/bungalow1.jpg",
				"caption": "Ocean View",
				"_id": "659bde75ebb8445f84429aae"
			},
			{
				"url": "https://example.com/images/bungalow2.jpg",
				"caption": "Living Area with Deck",
				"_id": "659bde75ebb8445f84429aaf"
			}
		],
		"size": 1500,
		"owner": "659bc7672a7773f627849404",
		"propertyStatus": "For Sale",
		"createdAt": "2024-01-08T11:37:25.136Z",
		"updatedAt": "2024-01-08T11:37:25.136Z",
		"__v": 0
	}
]

Authorization header:Needed

Successful response:200 OK

Error handling:
401 Unauthorized:
User is not authenticated or authorized to view listings.
404 Not Found:
The user has no listings.


api:api/listings/changetosold/:listingId
Descrption:when called this ,a property state has been changed to sold and has been added to the owner soldlist and removed from sellingList.
Method: PUT

Request body:None

Response body:{
  "message": "Listing marked as sold successfully"
}
Authorization:Needed

Successful Response:200 OK

Error Handling:

   401 Unauthorized: The user is not authenticated or does not have permission to change the listing status.
    404 Not Found: The listing with the specified ID does not exist.


API Endpoint:  /api/listings/:listingId
    Description: Retrieve detailed information about a specific listing. Useful for displaying detailed views of a property, including all images, descriptions, and contact details.
Method: GET
Request body: none

Response body:
[
	{
		"location": {
			"coordinates": {
				"type": "Point",
				"coordinates": [
					-73.935242,
					40.73061
				]
			},
			"address": "123 Main St",
			"city": "Metropolis",
			"state": "NY",
			"zipCode": "12345"
		},
		"price": {
			"amount": 500000,
			"currency": "Taka"
		},
		"rooms": {
			"total": 5,
			"bedrooms": 2,
			"bathrooms": 2,
			"kitchens": 1,
			"livingRooms": 1
		},
		"_id": "659bd4bdc6b7dc8407db3bfd",
		"title": "Stunning Urban Apartment",
		"description": "A beautiful, modern apartment located in the heart of the city. Features two bedrooms, a spacious living room, and a state-of-the-art kitchen.",
		"images": [
			{
				"url": "https://example.com/images/apartment1.jpg",
				"caption": "Front View",
				"_id": "659bd4bdc6b7dc8407db3bfe"
			},
			{
				"url": "https://example.com/images/apartment2.jpg",
				"caption": "Living Room",
				"_id": "659bd4bdc6b7dc8407db3bff"
			}
		],
		"size": 1200,
		"owner": "659bc7672a7773f627849404",
		"propertyStatus": "For Sale",
		"createdAt": "2024-01-08T10:55:57.086Z",
		"updatedAt": "2024-01-08T10:55:57.087Z",
		"__v": 0
	},
	{
		"location": {
			"coordinates": {
				"type": "Point",
				"coordinates": [
					-122.345678,
					37.987456
				]
			},
			"address": "456 Ocean Blvd",
			"city": "Sunshine Bay",
			"state": "CA",
			"zipCode": "98765"
		},
		"price": {
			"amount": 750000,
			"currency": "USD"
		},
		"rooms": {
			"total": 4,
			"bedrooms": 2,
			"bathrooms": 1,
			"kitchens": 1,
			"livingRooms": 1
		},
		"_id": "659bde75ebb8445f84429aad",
		"title": "Cozy Beachfront Bungalow",
		"description": "Charming, sun-drenched getaway steps from the sandy shores. Boasts two bedrooms, a bright open living area, and a deck overlooking the ocean.",
		"images": [
			{
				"url": "https://example.com/images/bungalow1.jpg",
				"caption": "Ocean View",
				"_id": "659bde75ebb8445f84429aae"
			},
			{
				"url": "https://example.com/images/bungalow2.jpg",
				"caption": "Living Area with Deck",
				"_id": "659bde75ebb8445f84429aaf"
			}
		],
		"size": 1500,
		"owner": "659bc7672a7773f627849404",
		"propertyStatus": "For Sale",
		"createdAt": "2024-01-08T11:37:25.136Z",
		"updatedAt": "2024-01-08T11:37:25.136Z",
		"__v": 0
	}
]

Authorization:Needed

Successful Response Code:

    200 OK

Error Handling:

    401 Unauthorized: The user is not authenticated (if authentication is required).
    404 Not Found: The listing with the specified ID does not exist

:
 API Endpoint:/api/listings/location

 Description: Retrieve listings based on the area of the user that has been provided during signup

 Method:GET

 Request body:None

 Response body:
 [
	{
		"location": {
			"coordinates": {
				"type": "Point",
				"coordinates": [
					-73.935242,
					40.73061
				]
			},
			"address": "123 Main St",
			"city": "Metropolis",
			"state": "NY",
			"zipCode": "12345"
		},
		"price": {
			"amount": 500000,
			"currency": "Taka"
		},
		"rooms": {
			"total": 5,
			"bedrooms": 2,
			"bathrooms": 2,
			"kitchens": 1,
			"livingRooms": 1
		},
		"_id": "659bd4bdc6b7dc8407db3bfd",
		"title": "Stunning Urban Apartment",
		"description": "A beautiful, modern apartment located in the heart of the city. Features two bedrooms, a spacious living room, and a state-of-the-art kitchen.",
		"images": [
			{
				"url": "https://example.com/images/apartment1.jpg",
				"caption": "Front View",
				"_id": "659bd4bdc6b7dc8407db3bfe"
			},
			{
				"url": "https://example.com/images/apartment2.jpg",
				"caption": "Living Room",
				"_id": "659bd4bdc6b7dc8407db3bff"
			}
		],
		"size": 1200,
		"owner": "659bc7672a7773f627849404",
		"propertyStatus": "For Sale",
		"createdAt": "2024-01-08T10:55:57.086Z",
		"updatedAt": "2024-01-08T10:55:57.087Z",
		"__v": 0
	},
	{
		"location": {
			"coordinates": {
				"type": "Point",
				"coordinates": [
					-122.345678,
					37.987456
				]
			},
			"address": "456 Ocean Blvd",
			"city": "Sunshine Bay",
			"state": "CA",
			"zipCode": "98765"
		},
		"price": {
			"amount": 750000,
			"currency": "USD"
		},
		"rooms": {
			"total": 4,
			"bedrooms": 2,
			"bathrooms": 1,
			"kitchens": 1,
			"livingRooms": 1
		},
		"_id": "659bde75ebb8445f84429aad",
		"title": "Cozy Beachfront Bungalow",
		"description": "Charming, sun-drenched getaway steps from the sandy shores. Boasts two bedrooms, a bright open living area, and a deck overlooking the ocean.",
		"images": [
			{
				"url": "https://example.com/images/bungalow1.jpg",
				"caption": "Ocean View",
				"_id": "659bde75ebb8445f84429aae"
			},
			{
				"url": "https://example.com/images/bungalow2.jpg",
				"caption": "Living Area with Deck",
				"_id": "659bde75ebb8445f84429aaf"
			}
		],
		"size": 1500,
		"owner": "659bc7672a7773f627849404",
		"propertyStatus": "For Sale",
		"createdAt": "2024-01-08T11:37:25.136Z",
		"updatedAt": "2024-01-08T11:37:25.136Z",
		"__v": 0
	}
]

Successful Response Code:

    200 OK

Authorization:required

Error Handling:

    401 Unauthorized: The user is not authenticated.
    404 Not Found: No listings found in the user's area.


 API Endpoint:  /api/listings/recent
 Description: Get recently added property listings. This can be useful for users who frequently check the platform for new opportunities.

 Method:GET
 Request Body: None

Response Body:
JSON

{
  "listings": [
    {
      // Property object (same structure as in previous examples)
    },
    // ... more listings
  ],
  "meta": {
    "limit": 10,  // Actual number of results returned
    "hasMore": true  // Whether there are more recent listings available
  }
}


Successful Response Code:

    200 OK

Error Handling:

    400 Bad Request: Invalid parameter format (e.g., invalid timestamp format for since).
    500 Internal Server Error: Unexpected server-side errors preventing listing retrieval.




