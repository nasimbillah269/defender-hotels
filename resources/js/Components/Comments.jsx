import { useForm } from "@inertiajs/react";
import { Form } from "react-bootstrap";
import AlertMessageComponents from "./AlertMassageCompononets";

export default function Comments({blog,comments}) {

    const { data, setData, post, reset, processing, errors } = useForm({
        name: '',
        email: '',
        comment: '',
    });
    
    const commentSubmit = (e) => {
        e.preventDefault();
    
        post(route('blogComments',blog.slug?blog.slug:'no-title'), {
            onSuccess: (response) => {
                reset(); // Reset the form data
            },
            onError: (errors) => {
                console.log(errors);
                // If the error response contains status and message, set them
                if(errors.status=='success'){
                    reset();
                }
            },
            onFinish: () => {
                console.log("change process finished.");
            }
        });
    };

    return (
        <>
           <div className="row">
                <div className="col-md-8" data-aos="fade-up">
                    {comments.data.length > 0 ?(
                        <>
                            {comments.data.map((comment)=>
                            <div className="news-post-comment-wrap">
                                <div className="post-user-comment">
                                <img
                                    src={comment.image_url}
                                    alt={comment.name}
                                />
                                </div>
                                <div className="post-user-content">
                                    {/* <span>
                                        <i className="star-rating"></i>
                                        <i className="star-rating"></i>
                                        <i className="star-rating"></i>
                                        <i className="star-rating"></i>
                                        <i className="star-rating"></i>
                                        </span> */}
                                    <h3>{comment.name}<span> {comment.formatDate}</span></h3>
                                    <p>
                                    {comment.content}
                                    </p>
                                    {/* <a className="post-repay" href="#">Reply<i className="ti-back-left"></i></a> */}
                                </div>
                            </div>
                            )}
                        </>
                    ):(
                        <div className="news-post-comment-wrap">
                            No Comments
                        </div>
                    )}
                </div>
                
                <div className="col-md-8 mb-30" data-aos="fade-up">
                    <h2 className="mb-30">Leave a Reply</h2>
                    <AlertMessageComponents status={errors.status} message={errors.message} />
                    <Form onSubmit={commentSubmit} className="row">
                        <div className="col-md-6">
                            <Form.Control 
                                type="text" 
                                placeholder="Full Name *"
                                value={data.name}
                                required
                                onChange={e => setData('name', e.target.value)}
                            />
                            {errors.name && <span className='text-danger' >{errors.name}</span>}
                        </div>
                        <div className="col-md-6">
                            <Form.Control 
                                type="email" 
                                placeholder="Email Address*"
                                value={data.email}
                                required
                                onChange={e => setData('email', e.target.value)}
                            />
                            {errors.email && <span className='text-danger' >{errors.email}</span>}
                        </div>
                        <div className="col-md-12">
                           <Form.Control 
                                as="textarea" // Correctly specify as textarea
                                placeholder="Your Comment *"
                                required
                                rows="4"
                                value={data.comment}
                                onChange={e => setData('comment', e.target.value)}
                            />
                            {errors.comment && <span className='text-danger' >{errors.comment}</span>}
                        </div>
                        <div className="col-md-12">
                            <button type="submit" disabled={processing} className="butn-dark2"><span>Send Comment</span></button>
                        </div>
                    </Form>
                </div>
            </div> 
        </>
    )
}