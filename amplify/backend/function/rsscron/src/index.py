import boto3, csv, os, time
from datetime import datetime, timedelta
from boto3.dynamodb.conditions import Key, Attr

# TODO - import based on variables instead of hardcoded values
c             = boto3.resource('dynamodb').Table('rssaws')
bucketname    = "rssblog"

# get the contents of the dynamodb table
def get_table():
    res = []
    n	  = datetime.now()
    s	  = n - timedelta(days = 30)
    ts	= int(time.mktime(s.timetuple()))

    e	  = c.query(IndexName = 'allts', KeyConditionExpression = Key('allts').eq('y'), FilterExpression= Key('timest').gt(str(ts)))
        
    for a in e['Items']:
        res.append(a)
    
        while 'LastEvaluatedKey' in e:
            z       = e['LastEvaluatedKey']
            e	      = c.query(ExclusiveStartKey = z, IndexName = 'allts', KeyConditionExpression = Key('allts').eq('y'), FilterExpression= Key('timest').gt(str(ts)))
            
            for a in e['Items']:
                res.append(a)
    return res

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
    
    for x in r:
        csvwriter.writerow(x.values())
    out.close()

# create a json file
def make_json(r):
    out         = open('/tmp/out.json', 'w')
    out.write('{"content": [')
    for x in r:
        out.write(str(x).replace('//', '\/\/')+", \n")
        
    out.write(']}')
    out.close()

# delete original files just in case
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

    # create a csv file and copy it to s3
    make_csv(r)
    cp_s3('out.csv')
    
    # create a json file and copy it to s3
    make_json(r)
    cp_s3('out.json')
        
    # return how many records were discovered    
    return('@@@ '+str(len(r)))
