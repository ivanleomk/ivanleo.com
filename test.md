

{/* 
### Installing SAM

I'm using a mac so installation instructions will be mac specific - you might need to modify them slightly for your operating system.

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)" #install homebrew 
brew install aws/tap/aws-sam-cli #Use Homebrew to install the sam-cli
```

### Setting up Code Commit 

Before you create the CodeCommit repository which will house your data, you need to create a set of HTTP Credentials which can be used to access the repository. You can do so by going to the `IAM` console and selecting the user that you want to use to access the repository. You then need to select the `security-credentials` tab. This should give you a screen that looks something like this.

<KommyImage height = {400} width={400} src = "/images/iam-credentials.png" blogImage={true} />

Once you've navigated to this page, scroll down until you see a section with the title `HTTPS Git Credentials for AWS CodeCommit`.

<KommyImage height = {400} width={400} src = "/images/security-credentials-screen.png" blogImage={true} />

Click on the generate button and you should see a screen that looks something like this. 

<KommyImage height = {400} width={400} src = "/images/generated-credentials.png" blogImage={true} />

Now that you have a set of credentials, you can now create a new `CodeCommit` repository and create a new repository in your codebase. 

<KommyImage height = {400} width={400} src = "/images/create-repository.png" blogImage={true} />

Once you've created the new repository, you can now clone it locally using credentials that you generated earlier. 

```bash
git clone https://git-codecommit.ap-southeast-1.amazonaws.com/v1/repos/[repo name]
```

> If you're having trouble cloning the repository, you can also rewrite the command to `git clone https://[username]:[password]@https://git-codecommit.ap-southeast-1.amazonaws.com/v1/repos/[repo name]



### Initialising The Project

Let's now initialise our project using the `SAM` cli tool. You can do so by running the command as 

> I chose the python 3.8 runtime here but you can also use the python 3.9 runtime. Langchain is not compatible at this time of writing with python 3.10 and above.

```bash
> sam init

Which template source would you like to use?
	1 - AWS Quick Start Templates
	2 - Custom Template Location
Choice: 1

Choose an AWS Quick Start application template
	1 - Hello World Example
	2 - Data processing
	3 - Hello World Example with Powertools for AWS Lambda
	4 - Multi-step workflow
	5 - Scheduled task
	6 - Standalone function
	7 - Serverless API
	8 - Infrastructure event management
	9 - Lambda Response Streaming
	10 - Serverless Connector Hello World Example
	11 - Multi-step workflow with Connectors
	12 - Full Stack
	13 - Lambda EFS example
	14 - DynamoDB Example
	15 - Machine Learning
Template: 1

Use the most popular runtime and package type? (Python and zip) [y/N]: N

Which runtime would you like to use?
	1 - aot.dotnet7 (provided.al2)
	2 - dotnet6
	3 - go1.x
	4 - go (provided.al2)
	5 - graalvm.java11 (provided.al2)
	6 - graalvm.java17 (provided.al2)
	7 - java17
	8 - java11
	9 - java8.al2
	10 - java8
	11 - nodejs18.x
	12 - nodejs16.x
	13 - nodejs14.x
	14 - nodejs12.x
	15 - python3.9
	16 - python3.8
	17 - python3.7
	18 - python3.10
	19 - ruby3.2
	20 - ruby2.7
	21 - rust (provided.al2)
Runtime: 16

What package type would you like to use?
	1 - Zip
	2 - Image
Package type: 2

Based on your selections, the only dependency manager available is pip.
We will proceed copying the template using pip.

Would you like to enable X-Ray tracing on the function(s) in your application?  [y/N]: N

Would you like to enable monitoring using CloudWatch Application Insights?
For more info, please view https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch-application-insights.html [y/N]: y
AppInsights monitoring may incur additional cost. View https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/appinsights-what-is.html#appinsights-pricing for more details
```

This will create a new folder in the current directory called `embed-lambda-function`. However, we don't want to have this subfolder in our repository so we can move all the subfiles out of the nested folder and delete the folder. 

```bash
mv ./embed-lambda-function/* ./
rm -rf ./embed-lambda-function
```

Now let's push this to our repository. 

```bash
git add . 
git commit -m "First commit to repository"
git push
```

You'll notice that our default branch in the repository is `master` but we really want it to be staging. So let's create a new branch called staging locally and push it to the remote repository. 

```bash
git checkout -b "staging"
git push --set-upstream origin staging
```

We can then set it as a default branch by going to the `CodeCommit` console and selecting the `Settings` tab. Scroll down until you see the section called `Default Branch`. You want to change this from Master to Staging.

<KommyImage height = {400} width={400} src = "/images/change-default-branch.png" blogImage={true} />

## Deploying our Lambda function 

Since we used the `SAM` client, we've got a good amount of boilterplate setup for us - we just need to modify it to suit our needs.

The first thing that we're going to do is to increase the function configuration. In this case, we're increasing the timeout to `120` seconds and the memory size to `512` MB. Lambda provides a maximum memory size of 512 so we're going to use that.

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31
Description: >
  python3.8

  Sample SAM Template for embed-lambda-function

# More info about Globals: https://github.com/awslabs/serverless-application-model/blob/master/docs/globals.rst
Globals:
  Function:
    Timeout: 120
    MemorySize: 512
```

Next thing we need to do is to configure out resources. We're going to rename our resource to EmbedFunctionLambda and also define a path that takes a POST request and returns a 200 response. 

```yaml
Resources:
  ApiGatewayEndpoint:
    Type: AWS::Serverless::Api
    Properties:
      StageName: staging

  EmbedFile:
    Type: AWS::Serverless::Function
    Properties:
      FunctionName: embed-file-staging
      PackageType: Image
      Architectures:
      - x86_64
      Events:
        EmbedFile:
          Type: Api # More info about API Event Source: https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md#api
          Properties:
            Path: /embed-file
            Method: post
    Metadata:
      Dockerfile: Dockerfile
      DockerContext: ./embed-file
      DockerTag: python3.8-v1
```

We're then going to finish this up by rewriting our `Outputs` section as 

```yaml
Outputs:
  EmbedFileApi:
    Description: API Gateway endpoint URL for Prod stage for Hello World function
    Value: !Sub "https://${ServerlessRestApi}.execute-api.${AWS::Region}.amazonaws.com/staging/hello/"
  EmbedFileFunction:
    Description: Hello World Lambda Function ARN
    Value: !GetAtt EmbedFileFunction.Arn
  EmbedFileFunctionIamRole:
    Description: Implicit IAM Role created for Hello World function
    Value: !GetAtt EmbedFileFunctionRole.Arn
```

## Deploying Our Lambda 

Let's now try to deploy a version of our lambda to staging. Before we do so, we need to rename our `hello-world` folder which was created by us in `sam init` to `embed-file`. We can do so by running the command as 

```bash
mv hello_world ./embed-file
``







 */}
