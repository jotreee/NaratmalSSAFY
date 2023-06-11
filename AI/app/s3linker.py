import boto3

def s3_connection():
    try:
        # s3 클라이언트 생성
        s3 = boto3.client(
            service_name="s3",
            region_name="ap-northeast-2",
            aws_access_key_id="AKIAUZANV4XI3VCL4HMQ",
            aws_secret_access_key="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",
        )
    except Exception as e:
        print(e)
    else:
        print("s3 bucket connected!") 
        return s3