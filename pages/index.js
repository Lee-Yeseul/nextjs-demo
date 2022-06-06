import Head from 'next/head';
import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';

const Homepage = (props) => {
  return (
    <>
      <Head>
        <title>Tae Yeon</title>
        <meta
          name='description'
          content='Browse a huge list of highly active Tae Yeon Image'
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   // 코드는 서버에서만 실행된다.
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export async function getStaticProps() {
  // 빌드 프로세스에서 실행되므로 클라이언트 사이드에서 실행되지 않는다. 즉 코드가 클라이언트의 컴퓨터에 도달하지 않는다. but 데이터가 변경되면 자동으로 추가되는 게 아닌 빌드를 따로 해줘야 한다.
  //fetch data from an API
  const client = await MongoClient.connect(
    'mongodb+srv://yeseul:0309@cluster0.h2wupcg.mongodb.net/?retryWrites=true&w=majority'
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default Homepage;
