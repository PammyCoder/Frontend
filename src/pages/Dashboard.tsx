import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, CreditCard, User, Settings, Image as ImageIcon } from "lucide-react";

const Dashboard = () => {
  const purchases = [
    {
      id: "1",
      title: "Northern Lights Aurora",
      date: "2024-01-15",
      price: 29.99,
      thumbnail: "https://images.unsplash.com/photo-1579033461380-adb47c3eb938?w=200",
    },
    {
      id: "2",
      title: "Mountain Landscape",
      date: "2024-01-12",
      price: 34.99,
      thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200",
    },
    {
      id: "3",
      title: "City Night Lights",
      date: "2024-01-10",
      price: 27.99,
      thumbnail: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=200",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="container px-4 md:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">My Dashboard</h1>
            <p className="text-muted-foreground">Manage your account and purchases</p>
          </div>

          <Tabs defaultValue="purchases" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
              <TabsTrigger value="purchases">
                <Download className="h-4 w-4 mr-2" />
                Purchases
              </TabsTrigger>
              <TabsTrigger value="profile">
                <User className="h-4 w-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="billing">
                <CreditCard className="h-4 w-4 mr-2" />
                Billing
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>

            {/* Purchases Tab */}
            <TabsContent value="purchases" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Purchase History</CardTitle>
                  <CardDescription>View and download your purchased images</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {purchases.map((purchase) => (
                      <div
                        key={purchase.id}
                        className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
                      >
                        <img
                          src={purchase.thumbnail}
                          alt={purchase.title}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{purchase.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            Purchased on {new Date(purchase.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg mb-2">${purchase.price}</p>
                          <Button variant="premium" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">First Name</label>
                      <input
                        type="text"
                        defaultValue="John"
                        className="w-full px-3 py-2 rounded-md border border-input bg-background"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Last Name</label>
                      <input
                        type="text"
                        defaultValue="Doe"
                        className="w-full px-3 py-2 rounded-md border border-input bg-background"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <input
                      type="email"
                      defaultValue="john.doe@example.com"
                      className="w-full px-3 py-2 rounded-md border border-input bg-background"
                    />
                  </div>
                  <Button variant="hero">Save Changes</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Billing Tab */}
            <TabsContent value="billing">
              <Card>
                <CardHeader>
                  <CardTitle>Billing Information</CardTitle>
                  <CardDescription>Manage your payment methods</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">No payment methods saved yet.</p>
                  <Button variant="premium">Add Payment Method</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive updates about new images</p>
                    </div>
                    <input type="checkbox" className="rounded" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <div>
                      <p className="font-medium">Marketing Emails</p>
                      <p className="text-sm text-muted-foreground">Receive promotional content</p>
                    </div>
                    <input type="checkbox" className="rounded" />
                  </div>
                  <Button variant="destructive" className="mt-4">Delete Account</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
