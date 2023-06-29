import { DynamoDBClient, ScanCommand, UpdateItemCommand } from '@aws-sdk/client-dynamodb'

const client = new DynamoDBClient({
  region: 'eu-west-1',
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY
  }
})

export const updateUserPictureData = (pictureData: string, userId: string) => {
  const command = new UpdateItemCommand({
    TableName: 'drawing-app-table',
    Key: {
      user_id: {
        S: userId
      }
    },
    AttributeUpdates: {
      picture_data: {
        Value: { S: pictureData }
      }
    }
  })

  client.send(command)
}

export const getOtherPicturesData = async (userId: string) => {
  const command = new ScanCommand({
    TableName: 'drawing-app-table'
  })

  const data = await client.send(command)
  return data.Items?.filter(
    (item: any) => item?.picture_data?.S?.length > 1 && item.user_id.S !== userId
  ).map((item) => item.picture_data.S)
}
