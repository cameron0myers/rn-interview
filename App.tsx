/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';

declare const global: {HermesInternal: null | {}};

////////////////////////////////////////////////////////////////////////////////
// INTERVIEW NOTES: START WITH THIS COMPONENT FOR YOUR IMPLEMENTATION
////////////////////////////////////////////////////////////////////////////////
interface APIGetPhotosResponse {
  id: string;
  memberId: string;
  photos: APIPhoto[];
}

interface APIPhoto {
  id: string;
  url: string;
  width: number;
  height: number;
}

const App = () => {
  const [data, setData] = useState<APIGetPhotosResponse>({
    id: '',
    memberId: '',
    photos: [],
  });

  useEffect(() => {
    fetch('http://localhost:3000/member/1/photos')
      .then((res) => res.json())
      .then((resJson: APIGetPhotosResponse[]) => {
        console.log(resJson);
        setData(resJson[0]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleClickAdd = () => {
    fetch('http://localhost:3000/member/1/photos', {method: 'POST'})
      .then(() => {})
      .catch((err) => {
        console.error(err);
      });
  };

  const handleClickRemove = (id: string) => {
    fetch(`http://localhost:3000/member/${id}/photos`, {method: 'DELETE'})
      .then(() => {})
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={data.photos}
          horizontal={false}
          numColumns={3}
          keyExtractor={(item) => {
            return item.id;
          }}
          renderItem={(post) => {
            const item = post.item;
            return (
              <View style={styles.card}>
                <Image
                  style={styles.cardImage}
                  // width={item.width}
                  // height={item.height}
                  source={{uri: item.url}}
                />
                <View style={styles.cardFooter}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleClickRemove(item.id)}>
                    <Image
                      style={styles.icon}
                      source={{
                        uri:
                          'https://www.iconsdb.com/icons/preview/red/x-mark-xxl.png',
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
        <View style={styles.footer}>
          <TouchableOpacity style={styles.button} onPress={handleClickAdd}>
            <Image
              style={styles.icon}
              source={{
                uri:
                  'https://www.pngfind.com/pngs/m/52-524126_heavy-plus-sign-plus-vector-png-transparent-png.png',
              }}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#eee',
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor: '#E6E6E6',
  },
  listContainer: {
    alignItems: 'center',
  },
  /******** card **************/
  card: {
    marginVertical: 8,
    flexBasis: '30%',
    marginHorizontal: 5,
  },
  cardImage: {
    flex: 1,
    height: 180,
    width: 'auto',
    resizeMode: 'cover',
    borderRadius: 14,
  },
  cardFooter: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    margin: 4,
  },
  button: {
    padding: 12,
    borderRadius: 50,
    backgroundColor: 'white',
  },
  icon: {
    width: 25,
    height: 25,
  },
  footer: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    margin: 4,
  },
});

export default App;
