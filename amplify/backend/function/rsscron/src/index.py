import boto3, csv, json, gzip, os, pprint, time
from datetime import datetime, timedelta
from boto3.dynamodb.conditions import Key, Attr

# TODO - import based on variables instead of hardcoded values
c             = boto3.resource('dynamodb').Table('rssaws')
bucketname    = "rssblog"

# get the contents of the dynamodb table
def get_table():
    res = []
    n	  = datetime.now()

    # retrieve blogposts up to 21 days old
    s	  = n - timedelta(days = 21)
    ts	= int(time.mktime(s.timetuple()))

    # query the dynamodb table for recent blogposts
    e	  = c.query(IndexName = 'allts', KeyConditionExpression = Key('allts').eq('y'), FilterExpression= Key('timest').gt(str(ts)))
        
    # iterate over the returned items
    for a in e['Items']:
        b   = '{"timest": "' + a['timest'] + '", "source": "' + a['source'] + '", "title": "' + a['title'] + '", "author": "' + a['author'] + '", "link": "' + a['link'] + '", "desc": "' + str(a['desc']).strip() + '", "author": "'+ a['author'] +'"}'
        res.append(b)
    
        # retrieve additional items if lastevaluatedkey was found 
        while 'LastEvaluatedKey' in e:
            z   = e['LastEvaluatedKey']
            e   = c.query(ExclusiveStartKey = z, IndexName = 'allts', KeyConditionExpression = Key('allts').eq('y'), FilterExpression= Key('timest').gt(str(ts)))
            
            for a in e['Items']:
                b   = '{"timest": "' + a['timest'] + '", "source": "' + a['source'] + '", "title": "' + a['title'] + '", "author": "' + a['author'] + '", "link": "' + a['link'] + '", "desc": "' + str(a['desc']).strip() + '", "author": "'+ a['author'] +'"}'
                res.append(b)

    # sort the json file by timestamp in reverse
    out = sorted(res, reverse = True)

    # pretty print the json for easier debugging
    pp = pprint.PrettyPrinter(indent = 2)
    pp.pprint(out)

    return out

# copy the file to s3 with a public acl
def cp_s3(x):
    s3      = boto3.client('s3')
    s3.put_object(
        Bucket = bucketname, 
        Body = open('/tmp/' + x, 'rb'), 
        Key = x, 
        ACL = 'public-read',
        CacheControl = 'public, max-age=3600'
    )

# create a json file
def make_json(r):

    # write the json raw output to /tmp
    jsonf         = open('/tmp/out.json', 'w')
    jsonf.write('{"content":')
    jsonf.write(str(r).replace("'", "").replace("\\", ""))
    jsonf.write('}')

    # write the json gz output to /tmp
    gzipf         = gzip.GzipFile('/tmp/out.json.gz', 'w')
    gzipf.write('{"content":'.encode('utf-8') )
    gzipf.write(str(r).replace("'", "").replace("\\", "").encode('utf-8') )
    gzipf.write('}'.encode('utf-8') )
    gzipf.close()

# try to delete original files from lambda /tmp 
def del_file():
    try:
        os.remove('/tmp/out.json*')
    except:
        pass    
    
    try:
        os.remove('/tmp/out.csv*')
    except:
        pass

# lambda handler
def handler(event, context):

    # get the records from the dynamodb table
    r   = get_table()

    # delete old files in case /tmp is not empty
    del_file()

    # create a json file and copy it to s3
    fnr  = 'out.json'
    fng  = 'out.json.gz'
    make_json(r)

    cp_s3(fnr)
    print("\nuploaded new file to " + bucketname + "/" + fnr) 

    cp_s3(fng)
    print("\nuploaded new file to " + bucketname + "/" + fng) 

    # return how many records were discovered   
    return('@@@ '+str(len(r)))

handler('','')
