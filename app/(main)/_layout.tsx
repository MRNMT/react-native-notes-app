import { Drawer } from 'expo-router/drawer';
import { View, Text } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { BookOpen, Briefcase, GraduationCap, Heart, User, LogOut } from 'lucide-react-native';

function CustomDrawerContent(props: any) {
    const { signOut, user } = useAuth();

    return (
        <DrawerContentScrollView {...props}>
            <View className="px-4 py-4 border-b border-gray-100 mb-2">
                <View className="h-10 w-10 bg-indigo-600 rounded-full items-center justify-center mb-2">
                    <Text className="text-white font-bold text-lg">{user?.email?.charAt(0).toUpperCase()}</Text>
                </View>
                <Text className="font-semibold text-gray-900">{user?.email}</Text>
            </View>
            <DrawerItemList {...props} />
            <View className="mt-4 px-4">
                <Button variant="ghost" onPress={() => signOut()} className="justify-start px-0">
                    <LogOut size={16} color="gray" className="mr-2" />
                    <Text className="text-gray-600 ml-2">Sign out</Text>
                </Button>
            </View>
        </DrawerContentScrollView>
    );
}

export default function MainLayout() {
    return (
        <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />} screenOptions={{
            headerShown: true,
            headerTitleStyle: { fontWeight: 'bold' },
        }}>
            <Drawer.Screen
                name="index"
                options={{
                    drawerLabel: "All Notes",
                    title: "All Notes",
                    drawerIcon: ({ color, size }) => <BookOpen size={size} color={color} />,
                }}
            />
            <Drawer.Screen
                name="notes/work"
                options={{
                    drawerLabel: "Work",
                    title: "Work Notes",
                    drawerIcon: ({ color, size }) => <Briefcase size={size} color={color} />,
                }}
            />
            <Drawer.Screen
                name="notes/study"
                options={{
                    drawerLabel: "Study",
                    title: "Study Notes",
                    drawerIcon: ({ color, size }) => <GraduationCap size={size} color={color} />,
                }}
            />
            <Drawer.Screen
                name="notes/personal"
                options={{
                    drawerLabel: "Personal",
                    title: "Personal Notes",
                    drawerIcon: ({ color, size }) => <Heart size={size} color={color} />,
                }}
            />
            <Drawer.Screen
                name="profile"
                options={{
                    drawerLabel: "Profile",
                    title: "Profile",
                    drawerIcon: ({ color, size }) => <User size={size} color={color} />,
                }}
            />
        </Drawer>
    );
}
