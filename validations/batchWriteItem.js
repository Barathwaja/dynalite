exports.types = {
  ReturnConsumedCapacity: {
    type: 'String',
    enum: ['TOTAL', 'NONE']
  },
  ReturnItemCollectionMetrics: {
    type: 'String',
    enum: ['SIZE', 'NONE']
  },
  RequestItems: {
    type: 'Map',
    requiredMap: true,
    tableMap: true,
    children: {
      type: 'List',
      children: {
        type: 'Structure',
        children: {
          DeleteRequest: {
            type: 'Structure',
            children: {
              Key: {
                type: 'Map',
                notNull: true,
                children: {
                  type: 'Structure',
                  children: {
                    S: 'String',
                    B: 'Blob',
                    N: 'String',
                    BS: {
                      type: 'List',
                      children: 'Blob',
                    },
                    NS: {
                      type: 'List',
                      children: 'String',
                    },
                    SS: {
                      type: 'List',
                      children: 'String',
                    }
                  }
                }
              }
            }
          },
          PutRequest: {
            type: 'Structure',
            children: {
              Item: {
                type: 'Map',
                notNull: true,
                children: {
                  type: 'Structure',
                  children: {
                    S: 'String',
                    B: 'Blob',
                    N: 'String',
                    BS: {
                      type: 'List',
                      children: 'Blob',
                    },
                    NS: {
                      type: 'List',
                      children: 'String',
                    },
                    SS: {
                      type: 'List',
                      children: 'String',
                    }
                  }
                }
              },
            }
          }
        },
      }
    }
  },
}

exports.custom = function(data) {
  for (var table in data.RequestItems) {
    if (!data.RequestItems[table].length)
      return 'The batch write request list for a table cannot be null or empty: ' + table
    if (data.RequestItems[table].some(function(item) { return !Object.keys(item).length }))
      return 'Supplied AttributeValue has more than one datatypes set, ' +
        'must contain exactly one of the supported datatypes'
  }
}
