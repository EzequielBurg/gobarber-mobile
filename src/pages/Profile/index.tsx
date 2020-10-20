import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useAuth } from '../../hooks/auth';

const Profile: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <View>
      <TouchableOpacity onPress={() => signOut()}>
        <Text>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
