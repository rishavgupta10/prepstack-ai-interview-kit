import UserProfile from './user-profile-section'
import { Navbar } from '@/shared/components/NavBar'

const ProfilePage = () => {
    return (
        <div className="max-w-screen h-screen">
            <Navbar/>
            <UserProfile />
        </div>
    )
}

export default ProfilePage
