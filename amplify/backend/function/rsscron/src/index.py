import boto3, csv, json, os, pprint, time
from datetime import datetime, timedelta
from boto3.dynamodb.conditions import Key, Attr

# TODO - import based on variables instead of hardcoded values
c             = boto3.resource('dynamodb').Table('rssaws')
bucketname    = "rssblog"

# get the contents of the dynamodb table
def get_table():
    res = []
    n	  = datetime.now()

    # retrieve blogposts up to 30 days old
    s	  = n - timedelta(days = 30)
    ts	= int(time.mktime(s.timetuple()))

    # query the dynamodb table for recent blogposts
    e	  = c.query(IndexName = 'allts', KeyConditionExpression = Key('allts').eq('y'), FilterExpression= Key('timest').gt(str(ts)))
        
    # iterate over the returned items
    for a in e['Items']:
        b   = '{"timest": "' + a['timest'] + '", "source": "' + a['source'] + '", "title": "' + a['title'] + '", "author": "' + a['author'] + '", "link": "' + a['link'] + '"}'
        res.append(b)
    
        # retrieve additional items if lastevaluatedkey was found 
        while 'LastEvaluatedKey' in e:
            z   = e['LastEvaluatedKey']
            e   = c.query(ExclusiveStartKey = z, IndexName = 'allts', KeyConditionExpression = Key('allts').eq('y'), FilterExpression= Key('timest').gt(str(ts)))
            
            for a in e['Items']:
                b   = '{"timest": "' + a['timest'] + '", "source": "' + a['source'] + '", "title": "' + a['title'] + '", "author": "' + a['author'] + '", "link": "' + a['link'] + '"}'
                res.append(b)

    # sort the json file by timestamp in reverse
    out = sorted(res, reverse = True)

    # pretty print the json for easier debugging
    pp = pprint.PrettyPrinter(indent = 2)
    pp.pprint(out)

    return out

# copy the file to s3 with a public acl
def cp_s3(x):
    s3      = boto3.resource('s3')
    s3.meta.client.upload_file('/tmp/'+x, bucketname, x, ExtraArgs = {'ACL': 'public-read'})

# create a csv file 
def make_csv(r):
    out         = open('/tmp/out.csv', 'w')
    csvwriter   = csv.writer(out, delimiter = ',',  quoting = csv.QUOTE_ALL)
    head        = r[0].keys()
    csvwriter.writerow(head)
    
    # write values to csv file and close it
    for x in r:
        csvwriter.writerow(x.values())
    out.close()

# create a json file
def make_json(r):

    # write the json output to /tmp
    out         = open('/tmp/out.json', 'w')
    out.write('{"content":')
    out.write(str(r).replace("'", ""))
    out.write('}')
    out.close()

# try to delete original files from lambda /tmp 
def del_file():
    try:
        os.remove('/tmp/out.json')
    except:
        pass    
    
    try:
        os.remove('/tmp/out.csv')
    except:
        pass

# lambda handler
def handler(event, context):

    # get the records from the dynamodb table
    r   = get_table()

    # delete old files in case /tmp is not empty
    del_file()

    '''
    # create a csv file and copy it to s3
    fn  = 'out.json'
    make_csv(r)
    cp_s3('out.csv')
    print("\nuploaded new file to " + bucketname + "/" + fn) 
    '''

    # create a json file and copy it to s3
    fn  = 'out.json'
    make_json(r)
    cp_s3(fn)
    print("\nuploaded new file to " + bucketname + "/" + fn) 

    # return how many records were discovered   
    return('@@@ '+str(len(r)))

#handler('','')
